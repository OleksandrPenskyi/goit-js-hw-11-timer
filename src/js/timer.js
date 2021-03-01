// класс-конструктор
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

    // ссылки с учетом конкретного div с его #id
    this.refs = {
      days: document.querySelector(`${this.selector} [data-value="days"]`),
      hours: document.querySelector(`${this.selector} [data-value="hours"]`),
      mins: document.querySelector(`${this.selector} [data-value="mins"]`),
      secs: document.querySelector(`${this.selector} [data-value="secs"]`),
    };
  }

  start() {
    // задаем интервал
    setInterval(() => {
      // текущая дата в миллисекундах от UNIX даты
      const currentDate = Date.now();
      // разница времени от искомой даты до текущего момента времени в миллисекундах
      const delta = this.targetDate.getTime() - currentDate;
      // callback ф-я перобразования миллисекунд в дни, часы...
      this.updateClockInterface(delta);
    }, 1000);
  }

  // ф-я просчета миллисекунд в часы, дни итд и добавление данных в html
  updateClockInterface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    // добавляем в HTML данные
    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.mins.textContent = mins;
    this.refs.secs.textContent = secs;
  }

  // ф-я добавления к числу нуля впереди числаю если длина числа меньше 2
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

// создаем новый обьект
const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('March 8, 2021'),
});

// вызываем методы обьекта
timer1.start();
