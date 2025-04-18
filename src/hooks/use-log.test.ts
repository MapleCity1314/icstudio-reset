import { renderHook, act } from '@testing-library/react-hooks';
import { useLog } from './use-log';

describe('useLog', () => {
  beforeEach(() => {
    // 清理可能的测试状态
    const { result } = renderHook(() => useLog());
    act(() => {
      result.current.clearLogs();
    });
  });

  test('应该初始化为空日志数组', () => {
    const { result } = renderHook(() => useLog());
    expect(result.current.logs).toEqual([]);
  });

  test('应该能添加一条日志', () => {
    const { result } = renderHook(() => useLog());
    
    act(() => {
      result.current.addLog('测试', '事件测试', '内容测试');
    });
    
    expect(result.current.logs.length).toBe(1);
    expect(result.current.logs[0].name).toBe('测试');
    expect(result.current.logs[0].event).toBe('事件测试');
    expect(result.current.logs[0].content).toBe('内容测试');
  });

  test('应该能够删除一条日志', () => {
    const { result } = renderHook(() => useLog());
    let logId: string;
    
    act(() => {
      logId = result.current.addLog('测试', '事件测试', '内容测试');
    });
    
    expect(result.current.logs.length).toBe(1);
    
    act(() => {
      result.current.removeLog(logId);
    });
    
    expect(result.current.logs.length).toBe(0);
  });

  test('应该能清空所有日志', () => {
    const { result } = renderHook(() => useLog());
    
    act(() => {
      result.current.addLog('测试1', '事件测试1', '内容测试1');
      result.current.addLog('测试2', '事件测试2', '内容测试2');
      result.current.addLog('测试3', '事件测试3', '内容测试3');
    });
    
    expect(result.current.logs.length).toBe(3);
    
    act(() => {
      result.current.clearLogs();
    });
    
    expect(result.current.logs.length).toBe(0);
  });

  test('应该能按名称查询日志', () => {
    const { result } = renderHook(() => useLog());
    
    act(() => {
      result.current.addLog('测试A', '事件测试1', '内容测试1');
      result.current.addLog('测试B', '事件测试2', '内容测试2');
      result.current.addLog('测试A', '事件测试3', '内容测试3');
    });
    
    expect(result.current.logs.length).toBe(3);
    
    const logsA = result.current.getLogsByName('测试A');
    expect(logsA.length).toBe(2);
    expect(logsA[0].name).toBe('测试A');
    expect(logsA[1].name).toBe('测试A');
  });

  test('应该能按事件类型查询日志', () => {
    const { result } = renderHook(() => useLog());
    
    act(() => {
      result.current.addLog('测试1', '登录', '用户登录');
      result.current.addLog('测试2', '注销', '用户注销');
      result.current.addLog('测试3', '登录', '管理员登录');
    });
    
    expect(result.current.logs.length).toBe(3);
    
    const loginLogs = result.current.getLogsByEvent('登录');
    expect(loginLogs.length).toBe(2);
    expect(loginLogs[0].event).toBe('登录');
    expect(loginLogs[1].event).toBe('登录');
  });

  test('多个组件应该共享同一个日志状态', () => {
    const { result: result1 } = renderHook(() => useLog());
    const { result: result2 } = renderHook(() => useLog());
    
    act(() => {
      result1.current.addLog('测试', '共享测试', '内容测试');
    });
    
    // 两个组件实例应该看到相同的日志
    expect(result1.current.logs.length).toBe(1);
    expect(result2.current.logs.length).toBe(1);
    expect(result2.current.logs[0].name).toBe('测试');
  });
});
