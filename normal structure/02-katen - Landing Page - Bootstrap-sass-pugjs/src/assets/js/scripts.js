// navbar functionality

var homeBtn = document.getElementsByClassName('drop-down')[0];
var featuresBtn = document.getElementsByClassName('drop-down')[1];
var homeNestedMenuArrow = document.getElementsByClassName('nested-menu-arrow')[0];
var homeNestedMenu = document.getElementsByClassName('nested-menu')[0];
var featuresNestedMenuArrow = document.getElementsByClassName('nested-menu-arrow')[1];
var featuresNestedMenu = document.getElementsByClassName('nested-menu')[1];

var postLayoutsBtn = document.getElementsByClassName(' sup-drop-down')[0];
var postFormatsBtn = document.getElementsByClassName(' sup-drop-down')[1];
var archiveBtn = document.getElementsByClassName(' sup-drop-down')[2];

var postLayoutsNestedMenu = document.getElementsByClassName('sup-nested-menu')[0];
var postFormatsNestedMenu = document.getElementsByClassName('sup-nested-menu')[1];
var archiveNestedMenu = document.getElementsByClassName('sup-nested-menu')[2];

homeBtn.addEventListener('mouseover', (event)=>{
    homeNestedMenuArrow.style.display = 'block';
    homeNestedMenu.style.display = 'block';
})
homeBtn.addEventListener('mouseout', (event)=>{
    homeNestedMenuArrow.style.display = 'none';
    homeNestedMenu.style.display = 'none';
})
featuresBtn.addEventListener('mouseover', (event)=>{
    featuresNestedMenuArrow.style.display = 'block';
    featuresNestedMenu.style.display = 'block';
})
featuresBtn.addEventListener('mouseout', (event)=>{
    featuresNestedMenuArrow.style.display = 'none';
    featuresNestedMenu.style.display = 'none';
})


postLayoutsBtn.addEventListener('mouseover', (event)=>{
    postLayoutsNestedMenu.style.display = 'block';
})
postLayoutsBtn.addEventListener('mouseout', (event)=>{
    postLayoutsNestedMenu.style.display = 'none';
})
postFormatsBtn.addEventListener('mouseover', (event)=>{
    postFormatsNestedMenu.style.display = 'block';
})
postFormatsBtn.addEventListener('mouseout', (event)=>{
    postFormatsNestedMenu.style.display = 'none';
})
archiveBtn.addEventListener('mouseover', (event)=>{
    archiveNestedMenu.style.display = 'block';
})
archiveBtn.addEventListener('mouseout', (event)=>{
    archiveNestedMenu.style.display = 'none';
})