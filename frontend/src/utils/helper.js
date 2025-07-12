export const validateEmail =(email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const profileMaker =(name) =>{
if(!name) {
    return "";
}

const words = name.split(" ");
let initials ="";

for(let i=0;i< Math.min(words.length, 2);i++){
    initials+= words[i][0];
}

return initials.toUpperCase();
};


export const getEmptyCardMessage =(filterType)=>{
    switch (filterType){
        case "search":
            return `Oops! No stories foundd matching your search.`

        case "date":
            return `No stories found in the given date range`;

        default:
        return`"Share your day by creating your first note! Click on 'Add' button to share your day"`;
    }
}

export const formatMessageTime=(date)=>{
    return new Date(date).toLocaleDateString("en-Us",{
        hour: "2-digit",
        minute:"2-digit",
        hour12: false,
    });
}