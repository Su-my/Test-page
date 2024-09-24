"use client";

import React, { useState } from 'react';
import { Button, Card, Typography, Row, Col } from 'antd';
import 'antd/dist/reset.css'; // 引入 Ant Design 样式
import ReactECharts from 'echarts-for-react';
import './styles.css';
// import Item from 'antd/es/list/Item';

const { Title, Paragraph } = Typography;

const NUM_ARMS = 3;
// const REWARDS = [0.3, 0.5, 0.7]; // 实际中奖概率
const ExpectedRewards = [10, 20, 30]; // 期望奖励
const variance = [5, 5, 5]; // 方差

function sampleReward(mean: number, stdDev: number): number {
    // Box-Muller transform to generate a random number from a normal distribution
    const u1: number = Math.random();
    const u2: number = Math.random();
    const randStdNormal: number = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2); // 标准正态分布（mean = 0, stdDev = 1）
    
    const randNormal: number = mean + stdDev * randStdNormal; // 转换为具有给定均值和标准差的正态分布

    // 截断在0-50之间
    return Math.min(Math.max(randNormal, 0), 50);
}


const Bandit = () => {



    const [rewards, setRewards] = useState(Array(NUM_ARMS).fill(0)); // 每个臂的累计奖励
    // 每个臂奖励的平方之和
    const [rewardsSquareSum, setRewardsSquareSum] = useState(Array(NUM_ARMS).fill(0));
    const [counts, setCounts] = useState(Array(NUM_ARMS).fill(0)); // 每个臂被点击的次数

    const handleArmClick = (armIndex: number) => {
        const reward = sampleReward(ExpectedRewards[armIndex], variance[armIndex]);
        console.log(`Arm ${armIndex + 1} Reward: ${reward}`);

        setRewards(prevRewards => {
            const newRewards = [...prevRewards];
            newRewards[armIndex] += reward;
            return newRewards;
        });
        setRewardsSquareSum(prevRewardsSquareSum => {
            const newRewardsSquareSum = [...prevRewardsSquareSum];
            newRewardsSquareSum[armIndex] += Math.pow(reward, 2);
            return newRewardsSquareSum;
        });
        setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[armIndex] += 1;
            return newCounts;
        });
    };

    // 计算每个臂的平均奖励和标准误差
    const avgRewards = rewards.map((reward, i) => (counts[i] > 0 ? reward / counts[i] : 0));
    // const standardErrors = rewards.map((reward, i) => (counts[i] > 0 ? Math.sqrt((avgRewards[i] * (1 - avgRewards[i])) / counts[i]) : 0));

    // 配置 ECharts 图表选项
    const getOption = () => {
        // 假设每次点击的reward是服从正态分布的
        const standardDeviations = rewards.map((reward, i) => {
            if (counts[i] === 0) {
                return 0;
            }
            const variance = rewardsSquareSum[i] / counts[i] - Math.pow(avgRewards[i], 2);
            return Math.sqrt(variance);
        });
    
        return {
            title: {
                text: 'Mean Reward',
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    // 获取每个数据点的内容
                    let tooltipContent = '';
                    params.forEach((item : any) => {
                        // if (item.seriesName === 'Average Reward') {
                        //     tooltipContent += `<div><strong>${item.name}</strong>: ${item.value} (Average Reward)</div>`;
                        // }
                        if (item.seriesName === 'Standard Deviation') {
                            tooltipContent += `<div><strong>${item.name}</strong>: ${item.value[1]} (Mean) ± ${item.value[2]} (Standard Deviation)</div>`;
                        }
                    });
                    return tooltipContent;
                },
            },
            xAxis: {
                type: 'category',
                data: ['Arm 1', 'Arm 2', 'Arm 3'],
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 50, // 假设 reward 范围是 0 到 50
            },
            series: [
                {
                    name: 'Average Reward',
                    type: 'bar',
                    data: avgRewards, // 这里的 data 是每个 arm 的平均奖励
                    itemStyle: {
                        color: '#5470C6',
                    },
                    z: 1,
                },
                {
                    name: 'Standard Deviation',
                    type: 'custom',
                    renderItem: (params: any, api: any) => {
                        const xValue = api.value(0);
                        const highPoint = api.coord([xValue, api.value(1) + api.value(2)]); // 高点（平均值 + 标准差）
                        const lowPoint = api.coord([xValue, api.value(1) - api.value(2)]); // 低点（平均值 - 标准差）
                        const halfWidth = api.size([1, 0])[0] * 0.1; // 误差线的宽度
                        const style = api.style({
                            stroke: '#000', // 误差线颜色
                            fill: 'none',
                        });
                        return {
                            type: 'group',
                            children: [
                                {
                                    type: 'line', // 垂直线
                                    shape: {
                                        x1: highPoint[0],
                                        y1: highPoint[1],
                                        x2: lowPoint[0],
                                        y2: lowPoint[1],
                                    },
                                    style,
                                },
                                {
                                    type: 'line', // 上横线
                                    shape: {
                                        x1: highPoint[0] - halfWidth,
                                        y1: highPoint[1],
                                        x2: highPoint[0] + halfWidth,
                                        y2: highPoint[1],
                                    },
                                    style,
                                },
                                {
                                    type: 'line', // 下横线
                                    shape: {
                                        x1: lowPoint[0] - halfWidth,
                                        y1: lowPoint[1],
                                        x2: lowPoint[0] + halfWidth,
                                        y2: lowPoint[1],
                                    },
                                    style,
                                },
                            ],
                        };
                    },
                    data: avgRewards.map((avgReward, i) => [i, avgReward, standardDeviations[i]]), // 数据格式：[x, 平均值, 标准差]
                    z: 2,
                },
            ],
        };
    };

    return (
        <div className="slot-machine-frame" style={{ padding: '20px 300px' }}>
            <Title level={1} style={{ /*居中 */ textAlign: 'center' }}>Multi-Armed Bandit</Title>
            <Row gutter={16}>
                {Array(NUM_ARMS).fill(null).map((_, i) => (
                    <Col span={8} key={i}>
                        <Button
                            type="primary"
                            block
                            className="slot-button"
                            onClick={() => handleArmClick(i)}
                            style={{ marginBottom: '10px' }}
                        >
                            Arm {i + 1}
                        </Button>
                    </Col>
                ))}
            </Row>

            <div style={{ marginTop: '20px' }}>
                <Title level={2}>Statistics:</Title>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                    {rewards.map((reward, i) => (
                        <Card
                            key={i}
                            title={`Arm ${i + 1}`}
                            style={{ flex: '0 0 auto', width: '300px' }} // 控制每个卡片的宽度
                        >
                            <Paragraph>
                                {counts[i]} pulls, Average reward: {counts[i] > 0 ? (reward / counts[i]).toFixed(2) : 0}
                            </Paragraph>
                        </Card>
                    ))}
                </div>

                <div style={{ marginTop: '30px' }}>
                    <ReactECharts option={getOption()} />
                </div>
            </div>
        </div>
    );
};

export default Bandit;
