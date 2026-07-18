// Hero day timeline
(function(){
  const track = document.getElementById('dayTimeline');
  const hours = ['9','10','11','12','1','2','3','4','5','6'];
  const bookedIdx = [0,1,3,6,8];
  const nextIdx = 4;
  hours.forEach((h, i) => {
    const tick = document.createElement('div');
    tick.className = 'tick' + (bookedIdx.includes(i) ? '' : ' open') + (i === nextIdx ? ' next' : '');
    if(i === nextIdx){
      tick.innerHTML = '<div class="next-flag">NEXT</div><div class="tick-bar"></div><div class="tick-label">'+h+'</div>';
    } else {
      tick.innerHTML = '<div class="tick-bar"></div><div class="tick-label">'+h+'</div>';
    }
    track.appendChild(tick);
  });
})();

// Booking calendar
(function(){
  const monthLabel = document.getElementById('calMonthLabel');
  const calGrid = document.getElementById('calGrid');
  const slotsGrid = document.getElementById('slotsGrid');
  const confirmBox = document.getElementById('bookingConfirm');
  let current = new Date(2026, 6, 1); // July 2026
  let selectedDate = null;
  let selectedSlot = null;

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dows = ['S','M','T','W','T','F','S'];
  const allSlots = ['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];

  function unavailableSet(day){
    // deterministic pseudo-availability per day
    const seed = day % 5;
    if(seed === 0) return [0,1,4,5];
    if(seed === 1) return [1,2,3,6];
    if(seed === 2) return [0,2,5,7];
    if(seed === 3) return [1,3,4,6];
    return [0,1,2,3];
  }

  function render(){
    monthLabel.textContent = monthNames[current.getMonth()] + ' ' + current.getFullYear();
    calGrid.innerHTML = '';
    dows.forEach(d => {
      const el = document.createElement('div');
      el.className = 'cal-dow';
      el.textContent = d;
      calGrid.appendChild(el);
    });
    const firstDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
    const daysInMonth = new Date(current.getFullYear(), current.getMonth()+1, 0).getDate();
    const today = new Date(2026, 6, 17); // "today" fixed for demo consistency

    for(let i=0; i<firstDay; i++){
      calGrid.appendChild(document.createElement('div'));
    }
    for(let d=1; d<=daysInMonth; d++){
      const cellDate = new Date(current.getFullYear(), current.getMonth(), d);
      const cell = document.createElement('button');
      cell.className = 'cal-day';
      cell.textContent = d;
      const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;
      if(isPast || isWeekend){
        cell.classList.add('disabled');
      } else {
        cell.classList.add('selectable');
        cell.addEventListener('click', () => selectDate(cellDate, cell));
      }
      if(selectedDate && cellDate.toDateString() === selectedDate.toDateString()){
        cell.classList.add('selected');
      }
      calGrid.appendChild(cell);
    }
  }

  function selectDate(date, cellEl){
    selectedDate = date;
    selectedSlot = null;
    render();
    renderSlots(date.getDate());
  }

  function renderSlots(day){
    slotsGrid.innerHTML = '';
    const unavailable = unavailableSet(day);
    allSlots.forEach((s, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot';
      btn.textContent = s;
      if(unavailable.includes(i)){
        btn.disabled = true;
        btn.style.opacity = '0.35';
        btn.style.cursor = 'default';
      } else {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.slot').forEach(el => el.classList.remove('selected'));
          btn.classList.add('selected');
          selectedSlot = s;
        });
      }
      slotsGrid.appendChild(btn);
    });
  }

  document.getElementById('prevMonth').addEventListener('click', () => {
    current.setMonth(current.getMonth()-1);
    render();
    slotsGrid.innerHTML = '';
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    current.setMonth(current.getMonth()+1);
    render();
    slotsGrid.innerHTML = '';
  });

  render();
  // preselect a sensible default date/slot for demo clarity
  const defaultDate = new Date(2026, 6, 20);
  selectDate(defaultDate, null);

  document.getElementById('bookingForm').addEventListener('submit', function(e){
    e.preventDefault();
    confirmBox.style.display = 'block';
    confirmBox.scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  });
});
