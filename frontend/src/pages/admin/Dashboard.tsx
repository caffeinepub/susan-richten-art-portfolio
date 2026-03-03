import { useNavigate } from '@tanstack/react-router';
import { useCMS } from '../../contexts/CMSContext';
import { Image, MessageSquare, Star, Tag, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const navigate = useNavigate();
  const { artworks, commissionInquiries } = useCMS();

  const totalArtworks = artworks.length;
  const categories = [...new Set(artworks.map(a => a.category))].length;
  const newInquiries = commissionInquiries.filter(i => i.status === 'new').length;
  const featuredWorks = artworks.filter(a => a.featured).length;

  const stats = [
    { label: 'Total Artworks', value: totalArtworks, icon: Image, color: 'text-blue-500' },
    { label: 'Categories', value: categories, icon: Tag, color: 'text-purple-500' },
    { label: 'New Inquiries', value: newInquiries, icon: MessageSquare, color: 'text-amber-500' },
    { label: 'Featured Works', value: featuredWorks, icon: Star, color: 'text-gold' },
  ];

  const recentInquiries = commissionInquiries.slice(0, 5);

  const statusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-amber-100 text-amber-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'declined': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your art studio admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-between" variant="outline" onClick={() => navigate({ to: '/admin/gallery' })}>
              <span className="flex items-center gap-2"><Plus className="w-4 h-4" />Add New Artwork</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline" onClick={() => navigate({ to: '/admin/blog' })}>
              <span className="flex items-center gap-2"><Plus className="w-4 h-4" />Write Blog Post</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline" onClick={() => navigate({ to: '/admin/commissions' })}>
              <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" />View Inquiries</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button className="w-full justify-between" variant="outline" onClick={() => navigate({ to: '/admin/pages' })}>
              <span className="flex items-center gap-2"><Image className="w-4 h-4" />Edit Pages</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-muted-foreground text-sm">No inquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map(inquiry => (
                  <div key={inquiry.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{inquiry.name}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.budget}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
