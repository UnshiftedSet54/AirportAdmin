import React, { Component } from 'react';

import classes from './DateSelector.module.css';
import Calendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css';

class DateSelector extends Component {
    daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    state = {
        calendarOpen: false,
        selectedDate: new Date()
    }

    getDate = () => {
        return this.state.selectedDate;
    }

    dateInputChangedHandler = (startDate, endDate) => {
        let nextDate = null;
        let currentDate = this.state.selectedDate.getTime();
        if (startDate < currentDate)
            nextDate = startDate;
        else if (startDate === currentDate)
            nextDate = endDate;
        if (nextDate < Date.now())
            nextDate = currentDate;
        this.setState({ selectedDate: new Date(nextDate) });
    }

    openCalendarHandler = (e) => {
        this.setState(prevState => ({ calendarOpen: !prevState.calendarOpen }));
    }

    render() {
        let day = this.daysOfTheWeek[this.state.selectedDate.getDay()];
        let date = this.state.selectedDate.getUTCDate();
        let month = this.state.selectedDate.getUTCMonth() + 1;
        let year = this.state.selectedDate.getUTCFullYear();
        let full = `${day}, ${date.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year.toString().substr(2, 2)}`;
        let calendar = this.state.calendarOpen ?
            (<Calendar
                startDate={this.state.selectedDate.getTime()}
                endDate={this.state.selectedDate.getTime()}
                onChange={this.dateInputChangedHandler}
                disableDates={date => date < new Date().getTime() - 86400000}
                style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    zIndex: 1000
                }} />) : null;
        return (
            <div className={classes.DateSelector}>
                <button
                    className={classes.DateSelectorButton}
                    onClick={this.openCalendarHandler}>
                    <span className={classes.Title}>{this.props.label}</span>
                    <span className={classes.Date}>{full}</span>
                    <span className={classes.Calendaric}>
                        <svg focusable="false" tabIndex="-1" width="18" height="16" viewBox="0 0 18 16">
                            <g fill="#37454D">
                                <path d="M16 1h-1c0-.552-.448-1-1-1s-1 .448-1 1H5c0-.552-.448-1-1-1S3 .448 3 1H2C.896 1 0 1.895 0 3v11c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V3c0-1.105-.896-2-2-2zm1 13c0 .552-.448 1-1 1H2c-.552 0-1-.448-1-1V5h16v9zm0-10H1V3c0-.552.45-1 1-1h14c.552 0 1 .448 1 1v1z">
                                </path>
                                <circle cx="4.5" cy="8.5" r="1.5"></circle>
                            </g></svg></span>
                </button>
                {calendar}
            </div>
        );
    }
}

export default DateSelector;
