import { useState } from "react";
import { BlogPost, useCMS } from "../../contexts/CMSContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface BlogPostFormProps {
  post?: BlogPost;
  onClose: () => void;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogPostForm({ post, onClose }: BlogPostFormProps) {
  const { addBlogPost, updateBlogPost } = useCMS();

  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    content: post?.content ?? "",
    publishDate: post?.publishDate ?? new Date().toISOString().split("T")[0],
    status: post?.status ?? ("draft" as BlogPost["status"]),
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: post ? prev.slug : slugify(title),
    }));
  };

  const handleSave = () => {
    if (post) {
      updateBlogPost(post.id, form);
    } else {
      addBlogPost({
        id: Date.now().toString(),
        ...form,
      });
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Post" : "New Blog Post"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Title</Label>
            <Input
              className="mt-1"
              value={form.title}
              onChange={handleTitleChange}
              placeholder="Post title"
            />
          </div>
          <div>
            <Label>Slug</Label>
            <Input
              className="mt-1"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              placeholder="post-slug"
            />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea
              className="mt-1"
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              rows={8}
              placeholder="Write your post content..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Publish Date</Label>
              <Input
                className="mt-1"
                type="date"
                value={form.publishDate}
                onChange={(e) => setForm((p) => ({ ...p, publishDate: e.target.value }))}
              />
            </div>
            <div>
              <Label>Status</Label>
              <select
                className="mt-1 w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value as BlogPost["status"] }))
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-gold hover:bg-gold/90 text-white">
            {post ? "Save Changes" : "Publish Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BlogPostForm;
