const sidebar = document.getElementById('sidebar');
const toggleSidebar = document.getElementById('toggleSidebar');
toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('-translate-x-full');
});

// Students Graph Data
const studentsData = {
  labels: ['Boys', 'Girls'],
  datasets: [{
    label: 'Students',
    data: [1234, 1134],
    backgroundColor: ['#6366F1', '#FFD700'],
    hoverBackgroundColor: ['#4F46E5', '#FBBF24']
  }]
};

// Attendance Chart Data
const attendanceData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [{
    label: 'Present',
    data: [55, 67, 78, 52, 61],
    backgroundColor: '#FBBF24',
    hoverBackgroundColor: '#F59E0B'
  }, {
    label: 'Absent',
    data: [12, 8, 5, 15, 9],
    backgroundColor: '#6366F1',
    hoverBackgroundColor: '#4F46E5'
  }]
};

// Students Graph
const studentsCtx = document.getElementById('studentsChart').getContext('2d');
new Chart(studentsCtx, {
  type: 'doughnut',
  data: studentsData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (context.parsed !== null) {
              label += ': ' + context.parsed + ' students';
            }
            return label;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
      easing: 'easeInOut'
    }
  }
});

// Attendance Chart
const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
new Chart(attendanceCtx, {
  type: 'bar',
  data: attendanceData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              label += ': ' + context.parsed.y + '%';
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10
        },
        grid: {
          borderColor: '#E5E7EB',
          borderWidth: 1
        }
      },
      x: {
        grid: {
          borderColor: '#E5E7EB',
          borderWidth: 1
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOut'
    }
  }
});

