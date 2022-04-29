type Room = {
    id: number;
    name: string;
}

type Booking = {
    id: number;
    roomName: string;
    from: string;
    to: string;
    guestName: string;

}

type DateRange = {
    date: Date
}


export default class BookingTimeline {

    element !: HTMLElement;
    subElements: object = {};
    rooms: Room[] = [];
    bookings: Booking[] = [];
    dateFrom: Date = new Date();
    dateTo: Date = new Date(new Date().setDate(new Date().getDate() + 31));



    constructor(dateFrom: Date | null, dateTo: Date | null, rooms: Room[], bookings: Booking[]) {

        if (dateFrom !== null && dateFrom instanceof Date) {
            this.dateFrom = dateFrom;
        }

        if (dateTo !== null && dateTo instanceof Date  ) {
            this.dateTo = dateTo;
        }

        this.bookings = bookings;
        this.rooms = rooms;
        this.render();
    }

    getTableHeader() {
        let dateRange: Date[] = this.getDatesInRange(this.dateFrom, this.dateTo);

        return `
        <div data-element="header" class="table__header table__row">
        <div data-element="header" class="table__cell">Rooms</div>
        ${dateRange.map((date: Date) => this.getHeaderRow(date)).join('')}</div>`;
    }

    getTableBody() {
        return `
        <div data-element="body" class="table__body">
          ${this.getTableRows(this.rooms)}
          
      </div>
        `;
    }
    getTableRows(rooms: Room[]) {
        return rooms.map(room => `
          <div   class="table__row">
          <div class="table__cell">${room.name}</div>${this.getTableRow(room)}
          </div>`
        ).join('');
    }

    getDatesInRange(startDate: Date, endDate: Date) {
        const date = new Date(startDate);

        const dates = [];

        while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }


    getTableRow(room: Room) {
        let dateRange: Date[] = this.getDatesInRange(this.dateFrom, this.dateTo);

        const cells: DateRange[] = dateRange.map((date: Date) => {
            return {
                date
            };
        });

        return cells.map((cell: DateRange) => {

            return this.bookings.map((booking: Booking) => {
                if (booking.roomName === room.name) {

                    let bookedCell = `<div class="table__cell">  &nbsp;  </div>`;

                    if (cell.date.toDateString() === new Date(booking.from).toDateString()) {

                        let cellWidth = 100 / cells.length;
                        let numberOfDates = (new Date(booking.to).getTime() - new Date(booking.from).getTime()) / (1000 * 60 * 60 * 24);

                        bookedCell = ` <div class="table__cell "  data-element="event">
                           <div class="table__cell__booked__event"    style=margin-left:${cellWidth / 2}%;width:${numberOfDates * cellWidth}%;>   ${booking.guestName} </div> 
                            </div> `;
                    }

                    return bookedCell;

                }
            }).join('');


        }).join('');
    }

    getHeaderRow(date: Date) {

        return date ? `
        <div class="table__cell" data-id="${date.toDateString()}"  >
          <span>${date.toDateString()}</span>
        
        </div>
      `: '';
    }



    getTable() {
        return `
        <div class="table">
          ${this.getTableHeader()}
          ${this.getTableBody()}
    
        </div>`;
    }



    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.getTable();
        const element = wrapper.firstElementChild;
        this.element = element as HTMLElement;
        this.subElements = this.getSubElements(this.element);

        let bookingElements = this.element.querySelectorAll('.table__cell__booked__event')
        bookingElements.forEach((el) => el.addEventListener('click', (event) => {
            console.log(event.target);
            alert(`Clicked on:  ${el.innerHTML}`);
        }))
    }


    getSubElements(element: any) {
        const elements = element.querySelectorAll('[data-element]');

        return [...elements].reduce((accum, subElement) => {
            accum[subElement.dataset.element] = subElement;

            return accum;
        }, {});
    }

    remove() {
        this.element.remove();

    }

    destroy() {
        this.remove();
        this.subElements = {};

    }


}