import BookingTimeline from './index';

const rooms = [
  {
    id: 1,
    name: 'Double Room'
  },
  {
    id: 2,
    name: 'Triple Room'

  },
  {
    id: 3,
    name: 'Studio'

  }
]

const bookings = [
  {
    id: 1,
    roomName: 'Double Room',
    from: '2022-04-30',
    to: '2022-05-03',
    guestName: 'John Doe'

  },
  {
    id: 2,
    roomName: 'Triple Room',
    from: '2022-05-10',
    to: '2022-05-11',
    guestName: 'Jane Air'
  }
  ,
  {
    id: 3,
    roomName: 'Studio',
    from: '2022-05-15',
    to: '2022-05-22',
    guestName: 'Mr. Elliot'
  }
]



describe('testing', () => {

  let bookingTimeline: BookingTimeline;

  beforeEach(() => {

    let date1 = new Date('2022-04-01');
    let date2 = new Date('2022-04-30');

    bookingTimeline = new BookingTimeline(date1, date2, rooms, bookings);

    document.body.append(bookingTimeline.element);
  });

  afterEach(() => {
    bookingTimeline.destroy();
  });

  it('should be rendered correctly', () => {
    expect(bookingTimeline.element).toBeVisible();
    expect(bookingTimeline.element).toBeInTheDocument();
  });


  it('should have ability to be destroyed', () => {
    bookingTimeline.destroy();

    expect(bookingTimeline.element).not.toBeInTheDocument();
  });


  it('should have handle null data correctly', () => {

    bookingTimeline = new BookingTimeline(null, null, rooms, bookings);

    document.body.append(bookingTimeline.element);

    expect(bookingTimeline.dateFrom.toDateString()).toEqual(new Date().toDateString());
    expect(bookingTimeline.dateTo.toDateString()).toEqual(new Date(new Date().setDate(new Date().getDate() + 31)).toDateString());
  });

});
