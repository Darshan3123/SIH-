function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


//attendance chart data

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
    // Attendance Chart
const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
new Chart(attendanceCtx, {
  type: 'bar',
  data: attendanceData,
  options: {
    responsive: true,
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


// ai chatbot

// Get the elements
const chatbotIcon = document.getElementById("chatbot-icon");
const chatbotPopup = document.getElementById("chatbot-popup");
const closeChatbot = document.getElementById("close-chatbot");

// Toggle the chatbot popup
chatbotIcon.addEventListener("click", function() {
  chatbotPopup.classList.remove("hidden");
});

// Close the chatbot when clicking on the close icon
closeChatbot.addEventListener("click", function() {
  chatbotPopup.classList.add("hidden");
});

