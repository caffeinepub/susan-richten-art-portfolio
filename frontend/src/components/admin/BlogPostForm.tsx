import { useState } from 'react';
import { BlogPost } from '../../contexts/CMSContext';
import { X } from 'lucide-react';

interface BlogPostFormProps {
  post?: BlogPost;
  onSave: (post: Omit<BlogPost, 'id'>) => void;
  onClose: () => void;
}

export default function BlogPostForm({ post, onSave, onClose }: BlogPostFormProps) {
  // Store date as a display string for the input, but convert to number on save
  const [form, setForm] = useState({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    content: post?.content ?? '',
    publishDateStr: post?.publishDate
      ? new Date(post.publishDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    status: (post?.status ?? 'draft') as 'draft' | 'published',
  });

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function handleTitleChange(title: string) {
    setForm(f => ({
      ...f,
      title,
      slug: f.slug || generateSlug(title),
    }));
  }

  function handleSave() {
    onSave({
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      content: form.content,
      publishDate: new Date(form.publishDateStr).getTime(),
      status: form.status,
    });
  }

  const inputClass = 'w-full px-3 py-2 border border-sand/60 rounded-sm bg-warm-white text-charcoal text-sm focus:outline-none focus:border-gold';
  const labelClass = 'block text-xs font-medium text-charcoal-muted uppercase tracking-wide mb-1';

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 flex items-center justify-center p-4">
      <div className="bg-warm-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-sand/40">
          <h2 className="font-serif text-xl text-charcoal">{post ? 'Edit Post' : 'New Blog Post'}</h2>
          <button onClick={onClose} className="text-charcoal-muted hover:text-charcoal transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              className={inputClass}
              placeholder="Post title"
            />
          </div>

          <div>
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              className={inputClass}
              placeholder="post-slug"
            />
          </div>

          <div>
            <label className={labelClass}>Content</label>
            <textarea
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={10}
              className={inputClass}
              placeholder="Write your post content here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Publish Date</label>
              <input
                type="date"
                value={form.publishDateStr}
                onChange={e => setForm(f => ({ ...f, publishDateStr: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as 'draft' | 'published' }))}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-sand/40">
          <button onClick={onClose} className="px-4 py-2 text-sm text-charcoal-muted hover:text-charcoal transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gold text-warm-white text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors"
          >
            {post ? 'Save Changes' : 'Create Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
