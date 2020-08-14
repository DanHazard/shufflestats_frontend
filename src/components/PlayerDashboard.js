


componentDidMount() {
  const token = localStorage.getItem("token")
  if (!token) {
    this.setState({
      redirect: '/login'
    })} else {
      const reqObj  = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch('http://localhost:3001/api/v1/current_player', reqObj)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.loginPlayer(data.player.data.attributes)
      })
    }
  }
