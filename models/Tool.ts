import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface ITool extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  website: string;
  logo?: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Contact';
  categories: string[];
  tags?: string[];
  features?: string[];
  githubUrl?: string;
  twitterHandle?: string;
  launchDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  searchMetadata: {
    monthlySearches: number;
    lastTrending?: Date;
    clickCount: number;
  };
  metaTitle?: string;
  metaDescription?: string;
  isVerified: boolean;
  submittedBy?: Types.ObjectId;
  url: string;
}

interface IToolModel extends Model<ITool> {
  search(
    query: string,
    options?: {
      page?: number;
      limit?: number;
      category?: string;
      pricing?: string;
      sort?: string;
    }
  ): Promise<{ tools: ITool[]; total: number; page: number; totalPages: number }>;
}

const ToolSchema = new Schema<ITool, IToolModel>({
  name: { 
    type: String, 
    required: true,
    trim: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    maxlength: 160
  },
  website: {
    type: String,
    required: true
  },
  logo: String,
  pricing: {
    type: String,
    enum: ['Free', 'Freemium', 'Paid', 'Open Source', 'Contact'],
    required: true
  },
  categories: [{
    type: String,
    required: true,
    index: true
  }],
  tags: [{
    type: String,
    index: true
  }],
  features: [String],
  githubUrl: String,
  twitterHandle: String,
  launchDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  // For search relevance
  searchMetadata: {
    monthlySearches: {
      type: Number,
      default: 0
    },
    lastTrending: Date,
    clickCount: {
      type: Number,
      default: 0
    }
  },
  // SEO
  metaTitle: String,
  metaDescription: String,
  // For content moderation
  isVerified: {
    type: Boolean,
    default: false
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Text index for search
ToolSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  categories: 'text'
}, {
  weights: {
    name: 10,
    tags: 5,
    categories: 3,
    description: 1
  },
  name: 'search_index'
});

// Pre-save hook to generate slug (temporarily disabled due to TypeScript issues)
// ToolSchema.pre('save', function(next) {
//   // @ts-ignore - Workaround for TypeScript/Mongoose typing conflict
//   const _next = next as Function;
//   const tool = this as ITool;
//   if (tool.isModified('name')) {
//     tool.slug = tool.name
//       .toLowerCase()
//       .replace(/[^\w\s-]/g, '')
//       .replace(/\s+/g, '-')
//       .replace(/--+/g, '-');
//   }
//   _next();
// });

// Virtual for tool URL
ToolSchema.virtual('url').get(function(this: ITool) {
  return `/tools/${this.slug}`;
});

// Static method for search
ToolSchema.statics.search = async function(
  this: IToolModel,
  query: string, 
  options: {
    page?: number;
    limit?: number;
    category?: string;
    pricing?: string;
    sort?: string;
  } = {}
): Promise<{ tools: ITool[]; total: number; page: number; totalPages: number }> {
  const { page = 1, limit = 10, category, pricing, sort = '-createdAt' } = options;
  
  const skip = (page - 1) * limit;
  
  const filter: any = {};
  
  if (query) {
    filter.$text = { $search: query };
  }
  
  if (category) {
    filter.categories = category;
  }
  
  if (pricing) {
    filter.pricing = pricing;
  }
  
  const [tools, total] = await Promise.all([
    this.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments(filter)
  ]);
  
  return {
    tools,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

// Update model in mongoose
const Tool: IToolModel = 
  (mongoose.models.Tool as IToolModel) || 
  mongoose.model<ITool, IToolModel>('Tool', ToolSchema);

export default Tool;
