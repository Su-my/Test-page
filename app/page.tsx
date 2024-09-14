"use client";

import React, { useState } from 'react';
import { Button, Card, Typography, Row, Col } from 'antd';
import 'antd/dist/reset.css'; // 引入 Ant Design 样式
import ReactECharts from 'echarts-for-react';
import './styles.css';
import Item from 'antd/es/list/Item';

const { Title, Paragraph } = Typography;

const NUM_ARMS = 3;
const REWARDS = [0.3, 0.5, 0.7]; // 实际中奖概率

const Bandit = () => {
    const [rewards, setRewards] = useState(Array(NUM_ARMS).fill(0)); // 每个臂的累计奖励
    const [counts, setCounts] = useState(Array(NUM_ARMS).fill(0)); // 每个臂被点击的次数

    const handleArmClick = (armIndex: number) => {
        const reward = Math.random() < REWARDS[armIndex] ? 1 : 0;

        setRewards(prevRewards => {
            const newRewards = [...prevRewards];
            newRewards[armIndex] += reward;
            return newRewards;
        });
        setCounts(prevCounts => {
            const newCounts = [...prevCounts];
            newCounts[armIndex] += 1;
            return newCounts;
        });
    };

    // 计算每个臂的平均奖励和标准误差
    const avgRewards = rewards.map((reward, i) => (counts[i] > 0 ? reward / counts[i] : 0));
    const standardErrors = rewards.map((reward, i) => (counts[i] > 0 ? Math.sqrt((avgRewards[i] * (1 - avgRewards[i])) / counts[i]) : 0));

    // 配置 ECharts 图表选项
    const getOption = () => ({
        title: {
            text: 'Average Reward vs True Probability',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['Arm 1', 'Arm 2', 'Arm 3'],
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 1,
        },
        series: [
            {
                name: 'Average Reward',
                type: 'bar',
                data: avgRewards,
                itemStyle: {
                    color: '#5470C6',
                },
                markPoint: {
                    data: REWARDS.map((r, i) => ({
                        name: 'True Probability',
                        value: r,
                        xAxis: i,
                        yAxis: r,
                        itemStyle: {
                            color: '#FF0000', // 这里设置 markPoint 的颜色
                        },
                    })),
                },
                // markLine: {
                //     data: [
                //         { type: 'average', name: 'Average Reward' },
                //     ],
                // },
            },
            // {
            //     name: 'Error Bars',
            //     type: 'custom',
            //     renderItem: (params: any, api: any) => {
            //         const xValue = api.value(0);
            //         const highPoint = api.coord([xValue, api.value(1) + api.value(2)]);
            //         const lowPoint = api.coord([xValue, api.value(1) - api.value(2)]);
            //         const halfWidth = api.size([1, 0])[0] * 0.1;
            //         const style = api.style({
            //             stroke: '#000',
            //             fill: 'none',
            //         });
            //         return {
            //             type: 'group',
            //             children: [
            //                 {
            //                     type: 'line',
            //                     shape: {
            //                         x1: highPoint[0],
            //                         y1: highPoint[1],
            //                         x2: lowPoint[0],
            //                         y2: lowPoint[1],
            //                     },
            //                     style,
            //                 },
            //                 {
            //                     type: 'line',
            //                     shape: {
            //                         x1: highPoint[0] - halfWidth,
            //                         y1: highPoint[1],
            //                         x2: highPoint[0] + halfWidth,
            //                         y2: highPoint[1],
            //                     },
            //                     style,
            //                 },
            //                 {
            //                     type: 'line',
            //                     shape: {
            //                         x1: lowPoint[0] - halfWidth,
            //                         y1: lowPoint[1],
            //                         x2: lowPoint[0] + halfWidth,
            //                         y2: lowPoint[1],
            //                     },
            //                     style,
            //                 },
            //             ],
            //         };
            //     },
            //     data: avgRewards.map((avgReward, i) => [i, avgReward, standardErrors[i]]),
            // },
        ],
    });

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
