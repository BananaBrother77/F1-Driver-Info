async function updateOpenF1Dashboard() {
  try {
    const response = await fetch("https://api.openf1.org/v1/drivers?session_key=latest");
    const drivers = await response.json();
    
    const filteredDrivers = drivers.filter((v, i, a) =>
      a.findIndex((t) => t.driver_number === v.driver_number) === i
    );
    
    filteredDrivers.sort((a, b) => Number(a.driver_number) - Number(b.driver_number));
    
    const table = document.querySelector('.table-ul');
    table.innerHTML = "";
    
    filteredDrivers.forEach((driver, index) => {
      const i = index + 1;
      const hexColor = driver.team_colour ? `#${driver.team_colour}` : 'var(--accent-color)';
      
      table.innerHTML += `
      <li class="table-li" id="driver-row-${i}">
        <span class="num" id="driver-${i}-rank" style="color: ${hexColor}">${driver.driver_number}</span>
        
        <div class="img-cell">
          <img src="${driver.headshot_url}" id="driver-${i}-img" alt="Driver" style="border-color: ${hexColor}">
        </div>
        
        <div class="info-cell">
          <div class="name" id="driver-${i}-name">${driver.full_name}</div>
          <div class="team" id="driver-${i}-team">${driver.team_name}</div>
        </div>
        
        <span class="team-colour" id="driver-${i}-points" style="color: ${hexColor}">
          #${driver.team_colour || 'N/A'}
        </span>
      </li>`;
    });
    
  } catch (error) {
    console.error('OpenF1 error:', error);
  }
}

document.addEventListener('DOMContentLoaded', updateOpenF1Dashboard);