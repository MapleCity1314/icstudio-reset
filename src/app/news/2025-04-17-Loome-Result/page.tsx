import dynamic from 'next/dynamic';

// 使用 dynamic import 引入客户端组件
const LoomeResultPage = dynamic(
  () => import('../2025-04-17-Loome-Result'), 
  { ssr: false }
);

export default function LoomeResultRoute() {
  return <LoomeResultPage />;
}

export const metadata = {
  title: 'Loome视频编辑器用户调研报告 | 2025年4月',
  description: '基于50位用户问卷调查的全面分析，了解用户对AI视频编辑工具的需求、使用习惯与期望',
}; 