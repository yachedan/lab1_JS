$(function () {
  $('#add').hover(function () {
    // $("#circle").css({'font-size': '30px','transition':'ease-in-out 0.2s','left':'5%','top':'15px'});
    // $("input").css({'opacity':'1'});
    $('#circle').animate({ fontSize: '30px', left: '-70%', top: '15px' })
    $('input').animate({ opacity: '1', width: '180px', top: '9px' })
  }, function () {
    // on mouseout, reset the background colour
    // $("#circle").css({'font-size': '','transition':'ease-in-out 0.2s','left':'','top':''});
    // $("input").css({'opacity':''});
    $('#circle').animate({ fontSize: '50px', left: '32%', top: '5px' })
    $('input').animate({ opacity: '0', width: '5px' })
  })
})
const clear = document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('input')

const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'

let LIST = []; let id = 0

const data = localStorage.getItem('TODO')

if (data) {
  LIST = JSON.parse(data)
  id = LIST.length
  loadList(LIST)
} else {
  LIST = []
  id = 0
}

function loadList (array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash)
  })
}

clear.addEventListener('click', function () {
  localStorage.clear()
  location.reload()
})

const options = { weekday: 'long', month: 'short', day: 'numeric' }
const today = new Date()

dateElement.innerHTML = today.toLocaleDateString('en-US', options)

function addToDo (toDo, id, done, trash) {
  if (trash) { return }

  const DONE = done ? CHECK : UNCHECK
  const LINE = done ? LINE_THROUGH : ''

  const item = `<li class="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class = "fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
              `
  const position = 'beforeend'
  list.insertAdjacentHTML(position, item)
}
document.addEventListener('keyup', function (even) {
  if (event.keyCode === 13) {
    const toDo = input.value

    if (toDo) {
      addToDo(toDo, id, false, false)
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      })
      localStorage.setItem('TODO', JSON.stringify(LIST))
      id++
    }
    input.value = ''
  }
})

function completeToDo (element) {
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)

  LIST[element.id].done = !LIST[element.id].done
}

function removeToDo (element) {
  element.parentNode.parentNode.removeChild(element.parentNode)

  LIST[element.id].trash = true
}

list.addEventListener('click', function (event) {
  const element = event.target
  const elementJob = element.attributes.job.value

  if (elementJob === 'complete') {
    completeToDo(element)
  } else if (elementJob === 'delete') {
    removeToDo(element)
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))
})
