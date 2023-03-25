let timer = document.querySelector('.timer')
let contaier = document.querySelector('.container')
let hour = document.querySelector('.hour')
let minute = document.querySelector('.minute')
let setButton = document.querySelector('.set-alarm')
let alarmsArr = []
let alarmIndex = 0
let hourValue = 0
let minuteValue = 0
let audio = new Audio('./house_alarm-clock_loud-92419.mp3')

const appendZero = (value)=>{
//  value = parseInt(value)
return value < 10 ?"0"+value : value

}
const check = (value)=>{
    value = parseInt(value)
    if (value <10) {
      value = appendZero(value)
    }
    return value
}
hour.addEventListener('input',()=>{
    
   hour.value = check(hour.value)
})

minute.addEventListener('input' , ()=>{
minute.value = check(minute.value)
})

const search = (parametter,value)=>{
    let existed = false,
        alarmObj,
        indexNo
     alarmsArr.forEach((alarm, index) => {
        if (alarm.id == value) {
            existed = true
            alarmObj = alarm
            indexNo = index
            
        }
     })
     return [existed , alarmObj , indexNo]
    }

const displayTime = ()=>{
    let date = new Date()
    let [hours , minutes , secondes] = [appendZero(date.getHours()),appendZero(date.getMinutes()),appendZero(date.getSeconds())]
    timer.innerHTML = `${hours}:${minutes}:${secondes}`
    alarmsArr.forEach((alarm) => {
        if (`${hours}:${minutes}` === `${alarm.hour}:${alarm.minute}` && alarm.isActive) {
            audio.play()
            audio.loop = true
        }
    })
   
}
const createAlarm = (alarm)=>{
    // Alarm Div
 let alarmDiv = document.createElement('div')
 alarmDiv.classList.add('alarm')
 alarmDiv.setAttribute('id',alarm.id)
 
 if (alarm.hour == ''&& alarm.minute == '') {
    alarmDiv.innerHTML +=`00:00</span>`
 }
 else if (alarm.hour == '' ) {
    alarm.hour = "00"
    alarmDiv.innerHTML += `<span>${alarm.hour}:${alarm.minute}</span>`
 }else if(alarm.minute == ''){
      alarm.minute = "00"
    alarmDiv.innerHTML += `<span>${alarm.hour}:${alarm.minute}</span>`
 }
 else{
 alarmDiv.innerHTML += `<span>${alarm.hour}:${alarm.minute}`}
//  Check Box Input
 let checkBox = document.createElement('input')
 checkBox.setAttribute('type','checkbox')
 checkBox.className = 'check'
 
 
 checkBox.addEventListener("click", (e) => {
    console.log(checkBox.checked)
    if (e.target.checked) {
      startAlarm(e);
      console.log(alarm)
    } else {
      stopAlarm(e);
    }
  })
 alarmDiv.appendChild(checkBox)
let deleteBtn = document.createElement("button")
deleteBtn.classList.add ('deleteBtn')
deleteBtn.innerText = `Clear`
deleteBtn.addEventListener('click',(e)=>{
    deleteAlarm(e)
})
alarmDiv.appendChild(deleteBtn)
contaier.appendChild(alarmDiv)
}
const startAlarm = (e)=>{
    let searchId = e.target.parentElement.getAttribute('id')
    let [existed,alarm,index] = search('id',searchId)
    if (existed) {
        alarmsArr[index].isActive = true
    }
    
}
const stopAlarm = (e)=>{
    let searchId = e.target.parentElement.getAttribute('id')
    let [existed,alarm,index] = search('id',searchId)
    if (existed) {
        alarmsArr[index].isActive = false
        audio.pause()
    }
}
const deleteAlarm = (e)=>{
    let searchId = e.target.parentElement.getAttribute('id')
    let [existed,alarm,index] = search('id',searchId)
    if (existed) {
        e.target.parentElement.remove()
        alarmsArr.splice(index,1)
    }
}
setButton.addEventListener('click' , ()=>{
    alarmIndex += 1
   alarm = {}
   alarm.id = alarmIndex
   alarm.hour = hour.value
   alarm.minute = minute.value
   alarm.isActive = false
//    console.log(alarm)
   alarmsArr.push(alarm)
    createAlarm(alarm)
})
window.onload = ()=>{
    setInterval(() => {
        displayTime()
    }, 1000);
}