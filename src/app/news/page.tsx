import Link from 'next/link';

export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">新闻与公告</h1>
      
      <div className="grid gap-6">
        <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">
            <Link href="/news/2025-04-17-Loome-Result" className="text-blue-600 hover:underline">
              Loome视频编辑器用户调研报告
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">2025年4月17日</p>
          <p className="mb-4">
            我们对Loome视频编辑器进行了全面的用户调研，收集了50份有效问卷。这份报告展示了用户的需求、偏好和痛点，为产品开发提供了重要参考。
          </p>
          <Link href="/news/2025-04-17-Loome-Result" className="text-blue-600 hover:underline">
            查看完整报告 →
          </Link>
        </div>
      </div>
    </div>
  );
} 