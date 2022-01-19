module.exports = {
    is_mine: (post_user_id, my_user_id) => {
        if (post_user_id === my_user_id) {
            return true;
        }
        return false;
    },
    format_date: (date) => {
        const thisDate = new Date(date);
        const month = thisDate.getMonth() + 1;
        const day = thisDate.getDate();
        const year = thisDate.getFullYear();
        const hour = (thisDate.getHours() > 12) ? thisDate.getHours() - 12 : thisDate.getHours();
        const minutes = (thisDate.getMinutes() < 10 ? '0' : '') + thisDate.getMinutes();
        const ampm = (thisDate.getHours() < 12) ? 'am' : 'pm';

        return `${month}/${day}/${year}@${hour}:${minutes}${ampm}`;
    },
    renderSnippet: (body) => {
        return (body.length > 25) ? body.substr(0,25) + '...' : body;
    },
};