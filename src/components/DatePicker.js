/**
 * Created by kenn on 16/9/11.
 */
import React from 'react'
import areIntlLocalesSupported from 'intl-locales-supported'
import IntlPolyfill from 'intl'
import DatePicke from 'material-ui/DatePicker'
let DateTimeFormat
class DatePicker extends React.Component {
    display = 'DataPicker'

    constructor( props ) {
        super( props )
    }

    static defaultProps = {
        cancelLabel: '取消',
        container: 'dialog',
        disableYearSelection: false,
        disabled: false,
    }

    static propTypes = {
        autoOk: React.PropTypes.bool,
        className: React.PropTypes.string,
        container: React.PropTypes.string,
        defaultDate: React.PropTypes.object,
        dialogContainerStyle: React.PropTypes.object,
        disableYearSelection: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        firstDayOfWeek: React.PropTypes.number,
        formatDate: React.PropTypes.func,
        maxDate: React.PropTypes.object,
        minDate: React.PropTypes.object,
        mode: React.PropTypes.string,
        okLabel: React.PropTypes.any,
        onChange: React.PropTypes.func,
        onDismiss: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onShow: React.PropTypes.func,
        onTouchTap: React.PropTypes.func,
        shouldDisableDate: React.PropTypes.func,
        style: React.PropTypes.object,
        textFieldStyle: React.PropTypes.object,
        value: React.PropTypes.object,
    }


    render() {
        const {
            autoOk,
            className,
            container,
            defaultDate,
            dialogContainerStyle,
            disableYearSelection,
            disabled,
            firstDayOfWeek,
            formatDate,
            maxDate,
            minDate,
            mode,
            okLabel,
            onChange,
            onDismiss,
            onFocus,
            onShow,
            onTouchTap,
            shouldDisableDate,
            style,
            textFieldStyle,
        } = this.props

        if (areIntlLocalesSupported(['zh-Hans-CN'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        } else {
            DateTimeFormat = IntlPolyfill.DateTimeFormat;
            require('intl/locale-data/jsonp/zh-Hans-CN');
        }


        return (
            <DatePicke
                DateTimeFormat={DateTimeFormat}
                autoOk={autoOk}
                className={className}
                container={container}
                defaultDate={defaultDate}
                dialogContainerStyle={dialogContainerStyle}
                disableYearSelection={disableYearSelection}
                disabled={disabled}
                firstDayOfWeek={firstDayOfWeek}
                formatDate={formatDate}
                maxDate={maxDate}
                minDate={minDate}
                mode={mode}
                okLabel={okLabel}
                onChange={onChange}
                onDismiss={onDismiss}
                onFocus={onFocus}
                onShow={onShow}
                onTouchTap={onTouchTap}
                shouldDisableDate={shouldDisableDate}
                textFieldStyle={textFieldStyle}
                style={style}
                locale='zh-Hans-CN'
            />
        )
    }
}
export default DatePicker