const userAuth = (props) => {
    fetch('Airport/EndPoint', {
        method: 'GET'
        
    })
    .then(r => r.text())
    .then(data => {
        this.props.history.push('/home')
    });
    return props.children;
};

export default userAuth;