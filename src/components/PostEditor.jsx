import React, { useState } from 'react';
import { createPost, updatePost } from '../services/posts';
import toast from 'react-hot-toast';

function PostEditor({ post, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    published: post?.published || false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (post) {
        await updatePost(post.id, formData);
        toast.success('Post updated successfully');
      } else {
        await createPost(formData);
        toast.success('Post created successfully');
      }
      onSave();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={6}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Publish post
          </label>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {post ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostEditor;