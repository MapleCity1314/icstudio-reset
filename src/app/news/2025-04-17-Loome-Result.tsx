'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// 定义颜色组
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#FF6B6B', '#6A7FDB', '#86C7F3'];

// 定义问卷数据结构
interface SurveyData {
  userTypes: { name: string; value: number }[];
  ageDistribution: { name: string; value: number }[];
  pricingPreference: { name: string; value: number }[];
  desiredFeatures: { name: string; value: number }[];
  aiFeatures: { name: string; value: number }[];
  usedTools: { name: string; value: number }[];
  editingScenarios: { name: string; value: number }[];
  learningTime: { name: string; value: number }[];
  preferredPlatform: { name: string; value: number }[];
  concerns: { name: string; value: number }[];
  devices: { name: string; value: number }[];
}

export default function LoomeResultPage() {
  const [data, setData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 处理问卷数据
    // 在实际应用中，可能会从API获取这些数据
    const processedData: SurveyData = {
      userTypes: [
        { name: '学生', value: 18 },
        { name: '普通用户', value: 15 },
        { name: '自媒体创作者', value: 6 },
        { name: '专业影视工作者', value: 3 },
        { name: '企业/团队宣传人员', value: 3 },
        { name: '其他', value: 10 }
      ],
      ageDistribution: [
        { name: '18岁以下', value: 1 },
        { name: '18-24岁', value: 38 },
        { name: '25-34岁', value: 5 },
        { name: '35-44岁', value: 1 },
        { name: '45-54岁', value: 1 }
      ],
      pricingPreference: [
        { name: '免费基础功能+高级功能订阅', value: 40 },
        { name: '按用量付费', value: 5 },
        { name: '一次性买断专业版', value: 5 },
        { name: '企业定制套餐', value: 3 },
        { name: '其他', value: 2 }
      ],
      desiredFeatures: [
        { name: 'AI自动生成字幕', value: 35 },
        { name: '智能配音/语音克隆', value: 15 },
        { name: '文本/图片转视频', value: 12 },
        { name: '自动剪辑', value: 12 },
        { name: 'AI数字人/虚拟主播', value: 5 },
        { name: 'AI在原有视频上生成特效', value: 4 },
        { name: '智能录屏标注', value: 4 },
        { name: '其他', value: 3 }
      ],
      aiFeatures: [
        { name: '输出质量', value: 30 },
        { name: '处理速度', value: 25 },
        { name: '学习成本低', value: 20 },
        { name: '自定义调整空间', value: 18 },
        { name: '与其他工具集成', value: 16 },
        { name: '多语言支持', value: 12 },
        { name: '其他', value: 3 }
      ],
      usedTools: [
        { name: '剪映/快影', value: 42 },
        { name: 'Premiere/Final Cut Pro', value: 14 },
        { name: 'Canva/Animoto', value: 8 },
        { name: 'Descript', value: 7 },
        { name: 'veed.io', value: 6 },
        { name: '其他', value: 3 }
      ],
      editingScenarios: [
        { name: '短视频制作', value: 35 },
        { name: '社交媒体动态', value: 10 },
        { name: '教学/培训视频', value: 8 },
        { name: '长视频创作', value: 3 },
        { name: '商业广告/产品展示', value: 2 },
        { name: '其他', value: 2 }
      ],
      learningTime: [
        { name: '10分钟内即可上手', value: 20 },
        { name: '30分钟基础教学', value: 10 },
        { name: '愿意花1小时学习高级功能', value: 10 },
        { name: '不介意复杂操作，功能强大更重要', value: 6 }
      ],
      preferredPlatform: [
        { name: '手机APP（移动优先）', value: 20 },
        { name: '全平台同步', value: 12 },
        { name: '网页版（无需安装）', value: 10 },
        { name: '桌面客户端（性能更强）', value: 6 }
      ],
      concerns: [
        { name: '生成内容版权问题', value: 15 },
        { name: 'AI效果不可控', value: 12 },
        { name: '数据隐私安全', value: 8 },
        { name: '硬件性能要求高', value: 6 },
        { name: '其他', value: 3 },
        { name: '未提及', value: 2 }
      ],
      devices: [
        { name: '手机端', value: 30 },
        { name: '网页端', value: 12 },
        { name: '桌面端', value: 15 },
        { name: '其他', value: 1 }
      ]
    };

    setData(processedData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  if (!data) {
    return <div className="flex justify-center items-center min-h-screen">无法加载数据</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Loome视频编辑器用户调研结果</h1>
      <p className="text-gray-600 mb-10 text-center">统计时间：2025年4月3日-2025年4月17日，共50份有效问卷</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* 用户类型 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">用户类型分布</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.userTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.userTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}人`, '数量']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 年龄分布 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">年龄分布</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}人`, '数量']} />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-2">主要用户年龄集中在18-24岁年龄段，占比76%</p>
        </div>

        {/* 期望功能 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">最受欢迎的功能</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.desiredFeatures}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}人`, '提及次数']} />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI特性关注点 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">用户关注的AI特性</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.aiFeatures}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}人`, '提及次数']} />
                <Bar dataKey="value" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 定价偏好 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">定价偏好</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pricingPreference}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {data.pricingPreference.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}人`, '数量']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-2">80%的用户偏好免费基础功能+高级功能订阅模式</p>
        </div>

        {/* 使用过的工具 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">使用过的剪辑工具</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.usedTools}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}人`, '使用人数']} />
                <Bar dataKey="value" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 剪辑场景 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">常见剪辑场景</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.editingScenarios}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.editingScenarios.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}人`, '数量']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 学习意愿 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">学习成本接受度</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.learningTime}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {data.learningTime.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}人`, '数量']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 担忧 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">用户最大担忧</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.concerns}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}人`, '提及次数']} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 使用设备 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">常用设备</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.devices}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.devices.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}人`, '数量']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">调研结论</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>用户群体：</strong>目标用户主要为学生和普通用户，年龄集中在18-24岁，主要以短视频创作为主要场景。</li>
          <li><strong>最需要的功能：</strong>AI自动生成字幕是最多用户需要的功能，其次是智能配音/语音克隆和文本/图片转视频。</li>
          <li><strong>商业模式：</strong>绝大多数用户偏好免费基础功能+高级功能订阅的模式。</li>
          <li><strong>关注点：</strong>用户最关注AI的输出质量和处理速度，以及低学习成本。</li>
          <li><strong>竞品分析：</strong>剪映/快影是最多用户使用过的工具，说明简单易用的界面和丰富模板很重要。</li>
          <li><strong>用户担忧：</strong>生成内容版权问题和AI效果不可控是用户最关心的问题。</li>
          <li><strong>设备偏好：</strong>手机端是最多用户使用的剪辑设备，需要优先考虑移动体验。</li>
        </ul>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>© 2025 Loome视频编辑器 - 所有数据基于50位用户调研问卷</p>
      </div>
    </div>
  );
} 