export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function browser_title(data, route_id) {
    const current_nav = data.nav.filter(item => item.path === route_id);
    let head_title = data.site_title;
    if (current_nav !== undefined && current_nav[0].path !== '/') {
      head_title = `${current_nav[0].title} - ${head_title}`;
    }
    
    return head_title;
}
