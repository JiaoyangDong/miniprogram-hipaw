import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { $wuxBackdrop } from '../index'

function getLabels(children = []) {
    return children.filter((v) => v.checked).map((v) => v.label).join(',')
}

function getDisplayValues(options = [], extra = true) {
    return options.reduce((acc, option) => {
        switch (option.type) {
                case 'radio':
                case 'checkbox':
                    acc.push(getLabels(option.children || []) || (extra ? option.label : ''))
                    break
                case 'filter':
                    acc.push(getDisplayValues(option.children || [], false))
                    break
                default:
                    acc.push(option.label)
        }
        return acc
    }, [])
}

function getSortValue(sort) {
    if (typeof sort === 'number' && [1, -1].includes(sort)) {
        return sort
    }
    return 1
}

function getValue(children = [], single = false) {
    const allValues = children.filter((v) => v.checked).map((v) => v.value)
    if (!single) return allValues
    return allValues[0] || ''
}

function getValues(options = []) {
    return options.reduce((acc, option) => {
        switch (option.type) {
                case 'radio':
                    acc.push(getValue(option.children, true))
                    break
                case 'checkbox':
                    acc.push(getValue(option.children, false))
                    break
                case 'text':
                    acc.push(option.checked ? option.value : '')
                    break
                case 'sort':
                    acc.push(option.checked ? getSortValue(option.sort) : '')
                    break
                case 'filter':
                    acc.push(getValues(option.children))
                    break
        }
        return acc
    }, [])
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

function isContain(a, b) {
    return Array.isArray(a) ? a.includes(b) : b === a
}

function getChangedParamPathFromFilter(children = [], values = [], paramKey = '') {
    return children.reduce((acc, option, index) => {
        return {
            ...acc,
            [`${paramKey}[${index}].checked`]: isContain(values, option.value),
        }
    }, {})
}

function getChangedValuesFromFilter(options = [], values = [], paramKey = 'options') {
    return options.reduce((acc, option, index) => {
        if (option.type === 'radio' || option.type === 'checkbox') {
            return {
                ...acc,
                ...getChangedParamPathFromFilter(option.children, values[index], `${paramKey}[${index}].children`),
            }
        }
        if (option.type === 'filter') {
            return {
                ...acc,
                ...getChangedValuesFromFilter(option.children, values[index] || [], `${paramKey}[${index}].children`),
            }
        }
        return acc
    }, {})
}

function getShowOptions(options = [], values = []) {
    return options.reduce((acc ,option, index) => {
        if (['radio', 'checkbox'].includes(option.type)) {
            return [...acc, { ...option, selected: getLabels(option.children || []) }]
        }
        if (option.type === 'filter') {
            return [...acc, { ...option, children: getShowOptions(option.children || [], values[index]) }]
        }
        return [...acc, { ...option }]
    }, [])
}

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-filterbar',
        },
        items: {
            type: Array,
            value: [],
        },
        cancelText: {
            type: String,
            value: '??????',
        },
        confirmText: {
            type: String,
            value: '??????',
        },
    },
    data: {
        displayValues: [],
        values: [],
    },
    observers: {
        ['items.**'](newVal) {
            this.setData({ options: newVal, values: getValues(newVal) })
        },
        ['options.**'](newVal) {
            this.updatedDisplayValues(newVal)
        },
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const bd = `${prefixCls}__bd`
            const item = `${prefixCls}__item`
            const text = `${prefixCls}__text`
            const icon = `${prefixCls}__icon`
            const pop = `${prefixCls}__pop`
            const scrollView = `${prefixCls}__scroll-view`
            const panel = `${prefixCls}__panel`
            const panelHd = `${prefixCls}__panel-hd`
            const panelTitle = `${prefixCls}__panel-title`
            const panelSelected = `${prefixCls}__panel-selected`
            const panelBd = `${prefixCls}__panel-bd`
            const groups = `${prefixCls}__groups`
            const group = `${prefixCls}__group`
            const radio = `${prefixCls}__radio`
            const btn = `${prefixCls}__btn`
            const check = `${prefixCls}__check`
            const btns = `${prefixCls}__btns`
            const select = `${prefixCls}__select`

            return {
                wrap,
                bd,
                item,
                text,
                icon,
                pop,
                scrollView,
                panel,
                panelHd,
                panelTitle,
                panelSelected,
                panelBd,
                groups,
                group,
                radio,
                btn,
                check,
                btns,
                select,
            }
        }],
    },
    methods: {
        updatedValues(values, callback) {
            if (this.data.values !== values) {
                this.setData({ values }, callback)
            }
        },
        updatedDisplayValues(options = this.data.options) {
            const displayValues = getDisplayValues(options)
            if (this.data.displayValues !== displayValues) {
                this.setData({ displayValues })
            }
        },
        /**
         * ????????????????????????
         * @param {Object} e ????????????
         * @param {Function} callback ????????????
         */
        onClose(e) {
            const { index } = e.currentTarget.dataset
            this.onSelectClose(index)
        },
        onPopupSelectChange(e) {
            let values = [...this.data.values]
            const options = this.showOptions || clone(this.data.options)
            const { value } = e.detail
            const { index, parentIndex } = e.currentTarget.dataset
            values[parentIndex] = values[parentIndex] || []
            values[parentIndex][index] = value
            // fix array empty
            values = [...values].map(v => v)
            if (options[parentIndex].children.length) {
                options[parentIndex].children.forEach((opt, idx) => {
                    if (opt.children) {
                        opt.children = opt.children.map((v) => ({
                            ...v,
                            checked: values[parentIndex][idx] ? isContain(values[parentIndex][idx], v.value) : false,
                        }))
                    }
                })
                this.updatedDisplayValues(options)
                this.showOptions = options
            }

            this.updatedValues(values)
        },
        /**
         * ?????????????????????????????? change ??????
         * @param {Object} e ????????????
         */
        onSelectChange(e) {
            const values = [...this.data.values]
            const { index, type } = e.currentTarget.dataset
            const { selectedValue: value } = e.detail

            values[index] = value

            this.updatedValues(values)

            // trigger onChange
            if (type === 'radio') {
                this.onSelectConfirm(e)
            }
        },
        onSelectClose(index, callback) {
            const params = {
                values: getValues(this.data.options),
                [`options[${index}].visible`]: false,
            }

            this.setData(params, () => {
                if (typeof callback === 'function') {
                    callback.call(this)
                }
                this.showOptions = null
                this.$wuxBackdrop.release()
            })
        },
        onSelectReset(e) {
            const values = [...this.data.values]
            const { index } = e.currentTarget.dataset

            values[index] = []

            this.updatedValues(values)

            const showOptions = this.showOptions || clone(this.data.options)
            if (showOptions && showOptions.length > 0) {
                showOptions.forEach((option, index) => {
                    if (option.type === 'filter') {
                        option.children = option.children.reduce((acc, child) => {
                            return [...acc, { ...child, children: child.children.map((v) => ({ ...v, checked: false })) }]
                        }, [])
                    }
                })
                this.updatedDisplayValues(showOptions)
                this.showOptions = null
            }
        },
        onSelectConfirm(e) {
            const { options, values } = this.data
            const { index, type } = e.currentTarget.dataset
            const params = getChangedValuesFromFilter(options, values)
            if (type === 'checkbox' && (!values[index] || !values[index].length)) {
                params[`options[${index}].checked`] = false
            }
            this.setData(params, () => this.onSelectClose(index, this.onChange))
        },
        /**
         * ????????????
         * @param {Object} e ????????????
         */
        onClick(e) {
            const { index } = e.currentTarget.dataset
            const { options } = this.data
            const values = getValues(options)

            // calc real values
            if (!options[index].visible) {
                this.setData({ values })
            }

            // open
            this.onOpenSelect(options, index)
        },
        /**
         * ???????????????
         * @param {Array} data ????????????
         * @param {Number} index ????????????
         */
        onOpenSelect(data = [], index = 0) {
            const current = data[index]
            const options = data.map((n, i) => {
                const params = Object.assign({}, n, {
                    checked: index === i ? !n.checked : false,
                })

                // ????????????????????????????????????
                if (n.checked) {
                    const has = this.getDifference(n.groups, current.groups)

                    params.checked = !!has.length

                    if (n.type === 'text' && index === i) {
                        params.checked = false
                    }

                    // ??????????????????????????????????????????
                    if (index !== i && !has.length) {
                        if (typeof params.children === 'object') {
                            if (['radio', 'checkbox'].includes(n.type)) {
                                params.children = params.children.map((n) => Object.assign({}, n, {
                                    checked: false,
                                }))
                            }

                            if (['filter'].includes(n.type)) {
                                params.children = params.children.map((n) => {
                                    return Object.assign({}, n, {
                                        children: n.children.map((m) => Object.assign({}, m, {
                                            checked: false,
                                        })),
                                        selected: '',
                                    })
                                })
                            }
                        }

                        if (['sort'].includes(n.type)) {
                            params.sort = undefined
                        }
                    }
                }

                // ????????????????????????
                if (['radio', 'checkbox', 'filter'].includes(n.type)) {
                    params.visible = index === i ? !n.visible : false

                    if (n.type === 'filter') {
                        this.$wuxBackdrop[index === i ? !n.visible ? 'retain' : 'release' : 'release']()
                    }
                }

                // ??????????????????????????????
                if (index === i && ['sort'].includes(n.type)) {
                    params.sort = typeof params.sort === 'number' ? -params.sort : 1
                }

                return params
            })

            this.setData({ options, index }, () => {
                if (!['radio', 'checkbox', 'filter'].includes(current.type)) {
                    this.onChange()
                }
            })
        },
        /**
         * ???????????????
         */
        onCloseSelect() {
            const params = this.data.options.reduce((acc, option, index) => {
                if (option.checked && option.visible) {
                    return { ...acc, [`options[${index}].visible`]: false }
                }
                return acc
            }, {})

            this.setData(params)
        },
        /**
         * ?????????????????????????????????
         * @param {Array} data ??????
         * @param {Array} values ??????
         */
        getDifference(data = [], values = []) {
            return data.filter(v => values.includes(v))
        },
        /**
         * ??????????????????????????????
         */
        onChange() {
            const { options } = this.data
            const checkedValues = getValues(options)
            const items = getShowOptions(options, checkedValues)

            this.updatedValues(checkedValues, () => {
                this.onCloseSelect()
                this.triggerEvent('change', {
                    checkedItems: items.filter((n) => n.checked),
                    items,
                    checkedValues,
                })
            })
        },
        /**
         * scroll-view ????????????????????????
         * @param {Object} e ????????????
         */
        onScroll(e) {
            this.triggerEvent('scroll', e)
        },
        /**
         * ?????? select ??? filter ????????????????????????
         * @param {Object} e ????????????
         */
        onEnter(e) {
            this.triggerEvent('open', e)
        },
        /**
         * ?????? select ??? filter ????????????????????????
         * @param {Object} e ????????????
         */
        onExit(e) {
            this.triggerEvent('close', e)
        },
        noop() {},
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
    attached() {
        const { items: newVal } = this.data
        this.setData({ options: newVal, values: getValues(newVal) })
    },
})
