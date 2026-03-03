import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useCMS, BlogPost } from '../../contexts/CMSContext';
import BlogPostForm from '../../components/admin/BlogPostForm';

export function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useCMS();
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this post? This cannot be undone.')) {
      deleteBlogPost(id);
    }
  };

  function handleSave(data: Omit<BlogPost, 'id'>) {
    if (editingPost) {
      updateBlogPost({ ...editingPost, ...data });
    } else {
      addBlogPost(data);
    }
    setShowForm(false);
    setEditingPost(undefined);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-4xl text-charcoal mb-1">Blog Manager</h1>
          <p className="font-body text-sm text-charcoal-muted">{blogPosts.length} posts</p>
        </div>
        <button
          onClick={() => { setEditingPost(undefined); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-3 bg-charcoal text-beige font-body text-sm tracking-wide hover:bg-charcoal-light transition-colors"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {blogPosts.length === 0 ? (
        <div className="bg-white p-12 text-center shadow-xs">
          <p className="font-body text-charcoal-muted italic">No blog posts yet. Create your first post!</p>
        </div>
      ) : (
        <div className="bg-white shadow-xs overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-beige-dark">
                <th className="px-6 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Title</th>
                <th className="px-6 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden md:table-cell">Date</th>
                <th className="px-6 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Status</th>
                <th className="px-6 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map(post => (
                <tr key={post.id} className="border-b border-beige-dark last:border-0 hover:bg-beige/30 transition-colors">
                  <td className="px-6 py-3">
                    <p className="font-body text-sm text-charcoal font-semibold">{post.title}</p>
                    <p className="font-body text-xs text-charcoal-muted">{post.slug}</p>
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    <span className="font-body text-xs text-charcoal-muted">
                      {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : '—'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => updateBlogPost({ ...post, status: post.status === 'published' ? 'draft' : 'published' })}
                      className={`font-body text-xs px-2 py-1 rounded transition-colors ${
                        post.status === 'published'
                          ? 'bg-sage/20 text-sage hover:bg-sage/30'
                          : 'bg-charcoal/10 text-charcoal-muted hover:bg-charcoal/20'
                      }`}
                    >
                      {post.status}
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingPost(post); setShowForm(true); }}
                        className="text-charcoal-muted hover:text-charcoal transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-charcoal-muted hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <BlogPostForm
          post={editingPost}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingPost(undefined); }}
        />
      )}
    </div>
  );
}

export default BlogManager;
