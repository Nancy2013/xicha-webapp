// 渐变色处理
export const linearGrandient = (startColor, endColor) => {
    return {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
            {
                offset: 0, color: `${startColor}`
            },
            {
                offset: 0.3, color: `${endColor}`
            },
            {
                offset: 1, color: `${endColor}`
            }
        ],
        global: false
    }
}