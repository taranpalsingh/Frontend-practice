const chips = [
    {
        label: 'litter',        
    },
    {
        label: 'clean',        
    },
    {
        label: 'spit',        
    },
    {
        label: 'sleep',        
    },
    {
        label: 'study',        
    },
    {
        label: 'Drink Water',        
    },
    
    {
        label: 'Work',        
    },
    
    {
        label: 'Play',        
    },
]

window.addEventListener("DOMContentLoaded", () => {
    populateChips();
    // Get the element by id
    const element = document.getElementById("div");
    // Add the ondragstart event listener
    element.addEventListener("dragstart", dragstart_handler);
});

function populateChips() {
    const container = document.getElementById('chip-container');
    chips.forEach((element, index) => {
        let chip = document.createElement('div');
        chip.innerHTML = element.label;
        chip.setAttribute('class', 'chip');
        chip.setAttribute('id', index);
        chip.setAttribute('draggable', 'true');
        chip.setAttribute('ondragstart', 'dragstart_handler(event)');
        container.append(chip);
        console.log('attached')
    });
}

function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/my-app", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }
  function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  function drop_handler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = ev.dataTransfer.getData("application/my-app");
    ev.target.appendChild(document.getElementById(data));
  }

