import { injectable } from 'inversify';
import ICalendar from './Interfaces/ICalendar';

@injectable()
class Calendar implements ICalendar {
    public Now(): Date {
        return new Date();
    }
}

export default Calendar;
