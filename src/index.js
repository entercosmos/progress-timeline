import React from 'react'
import { css, cx } from 'emotion'
import isNil from 'lodash/isNil'

const _parseFloat = input => parseFloat(input.toFixed(2))

const LegendItem = ({ children, offset }) => (
    <div
        className={cx(
            'ProgressTimeline__LegendItem',
            css`
                position: absolute;
                height: 100%;
                width: 40px;
                margin-left: -20px;
                text-align: center;
                font-size: 13px;
                color: #787878;
            `
        )}
        style={{
            left: offset + '%'
        }}
    >
        {children}
    </div>
)

const ProgressTimeline = ({ steps, value }) => {

    const data = steps.reduce((result, step, index) => {

        if (index === 0) {
            return result
        }

        const min = steps[0]
        const max = steps[steps.length - 1]
        const total = max - min

        const prevStep = steps[index - 1]

        const size = step - prevStep

        const offset = prevStep - min

        const offsetPercentage = _parseFloat((offset / total) * 100)
        const sizePercentage = _parseFloat((size / total) * 100)

        result.items.push({
            prevStep,
            step,
            offset,
            offsetPercentage,
            sizePercentage,
            size
        })

        if (!isNil(result.value) && result.value >= min && result.value <= max) {

            const indicatorOffset = result.value - min

            result.indicatorOffset = indicatorOffset
            result.indicatorOffsetPercentage = _parseFloat((indicatorOffset / total) * 100)
            result.indicatorEnabled = true
        }

        result.min = min
        result.max = max
        result.total = total

        return result

    }, {
            steps,
            value,
            items: [],
            min: 0,
            max: 0,
            total: 0,
            indicatorOffset: 0,
            indicatorOffsetPercentage: 0,
            indicatorEnabled: false
        })

    const { items, indicatorOffsetPercentage, indicatorEnabled, min } = data

    return (
        <div
            className={cx(
                'ProgressTimeline',
                css`
                    width: 100%;
                    position: relative;
                `
            )}
        >
            <div
                className={cx(
                    'ProgressTimeline__ProgressBar',
                    css`
                        position: relative;
                        width: 100%;
                        height: 10px;
                        background-color: rgba(70,85,105,.2);
                        border-radius: 3px;
                    `
                )}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={cx(
                            'ProgressTimeline__ProgressBarItem',
                            css`
                                    position: absolute;
                                    height: 100%;
                                    &:not(:first-child) {
                                        border-left: 1px solid #fff;
                                    }
                                `
                        )}
                        style={{
                            width: item.sizePercentage + '%',
                            left: item.offsetPercentage + '%'
                        }}
                    >

                    </div>
                ))}
            </div>
            <div
                className={cx(
                    'ProgressTimeline__Legend',
                    css`
                    position: relative;
                    width: 100%;
                    height: 10px;
                    margin-top: 8px;
                `
                )}
            >
                <LegendItem
                    offset={0}
                >
                    {min}
                </LegendItem>
                {items.map((item, index) => (
                    <LegendItem
                        key={index}
                        offset={item.offsetPercentage + item.sizePercentage}
                    >
                        {item.step}
                    </LegendItem>
                ))}
            </div>
            {indicatorEnabled ? (
                <div
                    className={cx(
                        'ProgressTimeline__Indicator',
                        css`
                        position: absolute;
                        top: -5px;
                        width: 20px;
                        height: 20px;
                        background: #07f;
                        border: 2px solid #fff;
                        border-radius: 50%;
                        margin-left: -10px;
                    `
                    )}
                    style={{
                        left: indicatorOffsetPercentage + '%'
                    }}
                />
            ) : null}
        </div>
    )
}

export default ProgressTimeline