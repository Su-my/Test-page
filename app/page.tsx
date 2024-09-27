"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Typography, Row, Col, Divider, Table, message, InputNumber, Descriptions, Drawer, Tag, Checkbox } from 'antd';
import 'antd/dist/reset.css'; // 引入 Ant Design 样式
import ReactECharts from 'echarts-for-react';
import './styles.css';
import type { DescriptionsProps, CheckboxProps } from 'antd';

const { Title, Paragraph } = Typography;

const INIT_NUM_ARMS = 3;
const INIT_Max_STEP = 40; // 最大步数
const para_C = 5; // UCB 算法的参数

function sampleReward(mean: number, stdDev: number): number {
    // Box-Muller transform to generate a random number from a normal distribution
    const u1: number = Math.random();
    const u2: number = Math.random();
    const randStdNormal: number = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2); // 标准正态分布（mean = 0, stdDev = 1）
    
    const randNormal: number = mean + stdDev * randStdNormal; // 转换为具有给定均值和标准差的正态分布

    // 截断在0-50之间
    return Math.min(Math.max(randNormal, 0), 50);
}

const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

const generateExpectedRewardsAndVariance = (numArms: number) => {
    const ExpectedRewards = [];
    let maxReward = 0, secondMaxReward = 0;

    // 生成期望奖励
    while (ExpectedRewards.length < numArms) {
        const reward = getRandomNumber(10, 40);
        ExpectedRewards.push(reward);
        
        // 维护最大和第二大值
        if (reward > maxReward) {
            secondMaxReward = maxReward;
            maxReward = reward;
        } else if (reward > secondMaxReward) {
            secondMaxReward = reward;
        }
    }

    const indexOfMaxReward = ExpectedRewards.indexOf(maxReward);
    const indexOfSecondReward = ExpectedRewards.indexOf(secondMaxReward);

    // 确保最大和第二大之间的差值在 1 - 2 之间
    if (maxReward - secondMaxReward < 0.5 || maxReward - secondMaxReward > 1) {
        const targetDifference = getRandomNumber(0.5, 1);
        ExpectedRewards[ExpectedRewards.indexOf(maxReward)] = secondMaxReward + targetDifference;
    }

    // 生成方差
    const variance = Array.from({ length: numArms }, () => Math.floor(getRandomNumber(1, 10)));
    variance[indexOfMaxReward] = 10;
    variance[indexOfSecondReward] = 10;

    return { ExpectedRewards, variance };
};



const Bandit = () => {
    const [numArms, setNumArms] = useState(INIT_NUM_ARMS);
    const [maxStep, setMaxStep] = useState(INIT_Max_STEP);
    const numArmsRef = useRef(numArms);
    const maxStepRef = useRef(maxStep);
    const [ExpectedRewards, setExpectedRewards] = useState<number[]>([]);
    const [variance, setVariance] = useState<number[]>([]);
    const [rewards, setRewards] = useState(Array(INIT_NUM_ARMS).fill(0)); // 每个臂的累计奖励
    // 每个臂奖励的平方之和
    const [rewardsSquareSum, setRewardsSquareSum] = useState(Array(INIT_NUM_ARMS).fill(0));
    const [counts, setCounts] = useState(Array(INIT_NUM_ARMS).fill(0)); // 每个臂被点击的次数
    const [rewardMatrix, setRewardMatrix] = useState(Array(INIT_NUM_ARMS).fill(0).map(() => Array(INIT_Max_STEP).fill(0)).map(
        (row, i) => row.map((_, j) => sampleReward(ExpectedRewards[i], variance[i]))
    )); // 每个臂每次点击的奖励
    const [totalCounts, setTotalCounts] = useState(0);
    const [rewardTrajectory, setRewardTrajectory] = useState(Array(INIT_Max_STEP).fill(0)); // 每次点击的奖励
    const [isStart, setIsStart] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    // const ucbValue = rewards.map((reward, i) => {
    //     const averageReward = counts[i] > 0 ? reward / counts[i] : 0;
    //     const explorationTerm = counts[i] > 0 ? para_C * Math.sqrt((2 * Math.log(totalCounts)) / counts[i]) : Infinity;
    //     return averageReward + explorationTerm;
    // })
    const [ucbValue, setUcbValue] = useState(Array(INIT_NUM_ARMS).fill(Infinity));
    // randomIndex 初始化为随机的一个arm
    const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * numArms));
    const [checkbox, setCheckBox] = useState(false)
    const [showDetails, setShowDetails] = useState(false);
    const [optimalTotalReward, setOptimalTotalReward] = useState(0);

    // const maxUCBValue = Math.max(...ucbValue);
    // // 找到所有最大值的索引
    // const maxIndices = ucbValue
    //     .map((value, index) => (value === maxUCBValue ? index : -1))
    //     .filter(index => index !== -1);
    // // 随机选择一个索引
    // const randomIndex = maxIndices[Math.floor(Math.random() * maxIndices.length)];


    const handleNumArmsChange = (value: any) => {
        numArmsRef.current = value; // 更新 ref 中的值
    };

    const handleMaxStepChange = (value: any) => {
        maxStepRef.current = value; // 更新 ref 中的值
    };

    useEffect(() => {
        // rewardMatrix 中第一维表示每个臂，第二维表示每次点击的奖励
        // 找出 rewardMatrix 中每次点击之后所有臂当中的最大值
        console.log(rewardMatrix);
        if(rewardMatrix)
        {
            const maxRewardSums = rewardMatrix.reduce((acc, rewards) => {
                rewards.forEach((reward, index) => {
                    if (acc[index] === undefined) {
                        acc[index] = reward;
                    } else {
                        acc[index] = Math.max(acc[index], reward);
                    }
                });
                return acc;
            }, []).reduce((sum, maxReward) => sum + maxReward, 0);

            setOptimalTotalReward(parseFloat(maxRewardSums.toFixed(2)));
        } else {
            setOptimalTotalReward(0);
        }

    }, [rewardMatrix]);

    useEffect(() => {
        // 当 numArms 变化时，更新 rewards 的状态
        setRewards(Array(numArms).fill(0));
        setRewardsSquareSum(Array(numArms).fill(0));
        setCounts(Array(numArms).fill(0));
        const { ExpectedRewards, variance } = generateExpectedRewardsAndVariance(numArms);
        setExpectedRewards(ExpectedRewards);
        setVariance(variance);
        setRewardMatrix(Array(numArms).fill(0).map(() => Array(maxStep).fill(0)).map(
            (row, i) => row.map((_, j) => sampleReward(ExpectedRewards[i], variance[i]))
        ));
    }, [numArms]);

    useEffect(() => {
        // 当 maxStep 变化时，更新 rewardTrajectory 的状态
        setRewardTrajectory(Array(maxStep).fill(0));
        setRewardMatrix(Array(numArms).fill(0).map(() => Array(maxStep).fill(0)).map(
            (row, i) => row.map((_, j) => sampleReward(ExpectedRewards[i], variance[i]))
        ));
    }, [maxStep]);

    useEffect(() => {
        setTotalCounts(counts.reduce((acc, count) => acc + count, 0));
        const _ucbValue = rewards.map((reward, i) => {
            const averageReward = counts[i] > 0 ? reward / counts[i] : 0;
            const explorationTerm = counts[i] > 0 ? para_C * Math.sqrt((2 * Math.log(totalCounts+1)) / counts[i]) : Infinity;
            return averageReward + explorationTerm;
        });
        setUcbValue(_ucbValue);
        // 找到所有最大值的索引, 并将randomIndex设置为其中一个
        const maxUCBValue = Math.max(..._ucbValue);
        const maxIndices = _ucbValue
            .map((value, index) => (value === maxUCBValue ? index : -1))
            .filter(index => index !== -1);
        setRandomIndex(maxIndices[Math.floor(Math.random() * maxIndices.length)]);
        // 输出每个 arm 的 ucb value
        console.log(_ucbValue);
    }, [counts]);

    useEffect(() => {
        if (totalCounts >= maxStep) {
            setShowDetails(true);
        } else {
            setShowDetails(false);
        }
    }, [totalCounts]);

    // 计算总奖励
    const totalReward = rewardTrajectory.reduce((acc, reward) => acc + reward, 0).toFixed(2);

    const handleArmClick = (armIndex: number) => {
        if (totalCounts >= maxStep) {
            messageApi.open({
                type: 'error',
                content: `已达到最大步数上限 ${maxStep}，请点击“Clear output”清除。`,
            });
            return;
        }
        const reward = rewardMatrix[armIndex][totalCounts];
        setRewardTrajectory(prevRewardTrajectory => {
            const newRewardTrajectory = [...prevRewardTrajectory];
            newRewardTrajectory[totalCounts] = reward;
            return newRewardTrajectory;
        });

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

    const handleClearOutput = () => {
        setRewards(Array(numArms).fill(0));
        setRewardsSquareSum(Array(numArms).fill(0));
        setCounts(Array(numArms).fill(0));
        setRewardTrajectory(Array(maxStep).fill(0));
    };
    
    const handleStartGame = () => {
        setNumArms(numArmsRef.current);
        setMaxStep(maxStepRef.current);
        handleClearOutput();
        setIsStart(true);
        const { ExpectedRewards, variance } = generateExpectedRewardsAndVariance(numArms);
        setExpectedRewards(ExpectedRewards);
        setVariance(variance);
        setRewardMatrix(Array(numArms).fill(0).map(() => Array(maxStep).fill(0)).map(
            (row, i) => row.map((_, j) => sampleReward(ExpectedRewards[i], variance[i]))
        ));
        setRandomIndex(Math.floor(Math.random() * numArms));
    };

    // 配置 ECharts 图表选项
    const getOption = () => {
        // 计算每个臂的平均奖励
        const avgRewards = rewards.map((reward, i) => (counts[i] > 0 ? reward / counts[i] : 0));

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
                            tooltipContent += `<div><strong>${item.name}</strong>: ${item.value[1].toFixed(2)} (Mean) ± ${item.value[2].toFixed(2)} (Standard Deviation)</div>`;
                        }
                    });
                    return tooltipContent;
                },
            },
            xAxis: {
                type: 'category',
                data: Array.from({ length: numArms }, (_, i) => `Arm${i + 1}`),
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

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Total steps',
            children: totalCounts,
        },
        {
            key: '2',
            label: 'Total reward',
            children: totalReward,
        }
    ]

    const itemsDrawer: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Optimal total reward',
            children: <div>{optimalTotalReward}</div>,
        },
        {
            key: '2',
            label: 'Realized Regret',
            children: (
                <div>
                    {(optimalTotalReward - parseFloat(totalReward)).toFixed(2)}
                </div>
            ),
        },
    ]

    const columns = [
        {
            title: 'Arm',
            dataIndex: 'arm',
            key: 'arm',
        },
        {
            title: 'Expected Reward',
            dataIndex: 'expectedReward',
            key: 'expectedReward',
        },
        {
            title: 'Variance',
            dataIndex: 'variance',
            key: 'variance',
        },
    ];

    const data = ExpectedRewards.map((reward, index) => ({
        key: index,
        arm: `Arm ${index + 1}`,
        expectedReward: reward.toFixed(2),
        variance: variance[index]?.toFixed(2) || 0,
    }));

    // Drawer 相关
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // checkbox 相关
    const handleCheckbox: CheckboxProps['onChange'] = (e) => {
        setCheckBox(e.target.checked);
    };

    return (
        <div className="slot-machine-frame" style={{ padding: '20px 300px'}}>
            {contextHolder}
            <div>
                <Title level={1} style={{ /*居中 */ textAlign: 'center' }}>Multi-Armed Bandit</Title>
                <Row gutter={16} justify="center">
                    <Col span={8}>
                        <InputNumber addonBefore={"设置 Arm 个数"}  defaultValue={numArms} onChange={handleNumArmsChange} min={1} max={20}/>
                    </Col>
                    <Col span={8}>
                        <InputNumber addonBefore={"设置最大 Step"}  defaultValue={maxStep} onChange={handleMaxStepChange} min={1} />
                    </Col>
                </Row>
                <div style={{ marginBottom: '20px' }} /> {/* 添加间距 */}
                <Row gutter={16} justify="center" align="middle">
                    <Col span={4}>
                        <Button type="primary" size="large" onClick={handleStartGame}>
                            {isStart ? 'Restart game' : 'Start game'}
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" size="large" onClick={handleClearOutput} disabled={!isStart}>
                            Clear output
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Button type="primary" size="large" onClick={showDrawer} disabled={!isStart || !showDetails}>
                            Show details
                        </Button>
                    </Col>
                    <Col span={4}>
                        <Checkbox onChange={handleCheckbox}>开启推荐</Checkbox>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    {Array(numArms).fill(null).map((_, i) => (
                        <Col span={8} key={i}>
                            <Button
                                type="primary"
                                block
                                className="slot-button"
                                onClick={() => handleArmClick(i)}
                                style={{ marginBottom: '10px' }}
                                disabled={!isStart}
                            >
                                Arm {i + 1}
                                {i === randomIndex && isStart && checkbox && <Tag color="green">UCB prefer</Tag>}
                            </Button>
                        </Col>
                    ))}
                </Row>

                <div style={{ marginTop: '20px' }}>
                    <Descriptions title="Statistics" bordered items={items} />
                    <div style={{ marginBottom: '20px' }} /> {/* 添加间距 */}
                    <Row gutter={[16, 16]}>
                        {rewards.map((reward, i) => (
                            <Col key={i} span={8}> {/* 这里的 span 可以根据需求调整 */}
                                <Card title={`Arm ${i + 1}`}>
                                    <Paragraph>
                                        {counts[i]} pulls, Average reward: {counts[i] > 0 ? (reward / counts[i]).toFixed(2) : 0}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div style={{ marginTop: '30px' }}>
                        <ReactECharts option={getOption()} />
                    </div>
                </div>
            </div>
            
            <Drawer title="Details" onClose={onClose} open={open}>
                <Table columns={columns} dataSource={data} pagination={false} style={{ marginTop: '20px' }} />
                <Descriptions bordered items={itemsDrawer} column = {1}/>
            </Drawer>
        </div>
    );
};

export default Bandit;
