const sectionNotif = document.getElementById('notifications');
const message = document.getElementById('message');
const div = document.getElementById('errorBox');

export const notificationView = (error) => {
    message.textContent = error;
    sectionNotif.style.display = 'inline-block';
    div.style.display =  'inline-block';
    
    setTimeout(() => {
        sectionNotif.style.display = 'none';
         div.style.display ='none';
    }, 3000);

    
}