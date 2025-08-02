const buttons = document.querySelectorAll('.activity-tracker_option');

const content = document.querySelector('.activity-tracker_activity');

const weeklyButton = document.querySelector('.activity-tracker_option[data-option="weekly"]');


let data= [];

buttons.forEach(button => {

    button.addEventListener('click', () => {

        buttons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        console.log(button.dataset.option);

        renderContent(button.dataset.option);

    });

})

async function fetchData() {

  try {

    const response = await fetch('data.json');

     data = await response.json();

    if (weeklyButton) {

    weeklyButton.click();  

}

   

  } catch (error) {

    console.error('Error fetching the data:', error);

  }

}


// Call the function to fetch and update data

fetchData();


function renderContent(option) {

    let timeSpan=''

    if(option === 'daily') {

        timeSpan = 'Yesterday'

    }

    if(option === 'weekly') {

        timeSpan = 'Last Week'

    }

    if(option === 'monthly') {

        timeSpan = 'Last Month'

    }

    content.innerHTML = '';

    let contentHTML = '';

       

  data.forEach(({ title, timeframes }) => {

    const formattedTitle = title.replace(' ', '-').toLowerCase();

    contentHTML += `

      <section class="activity-tracker_activity ${formattedTitle}">

        <div class="activity_bg ${formattedTitle}">

          <img src="./images/icon-${formattedTitle}.svg" alt="${title}-icon" />

        </div>

        <div class="activity_info">

          <header class="activity_header">

            <h2 class="activity_title">${title}</h2>

            <div class="activity_options">

              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">

                <path

                  d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"

                  fill="#BBC0FF"

                  fill-rule="evenodd"

                />

              </svg>

            </div>

          </header>

          <div class="activity_timeframes">

            <h3 class="activity_current-timeframe">${timeframes[option].current}hrs</h3>

            <div class="activity_previous-timeframe">

              <p>${timeSpan}</p>

              <p>-</p>

              <p>${timeframes[option].previous}hrs</p>

            </div>

          </div>

        </div>

      </section>

    `;

  });


  // Set the final HTML content once

  content.innerHTML = contentHTML;

}

   

