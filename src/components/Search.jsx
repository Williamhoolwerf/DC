import React, { Component } from 'react';
import axios from 'axios';
import '../SearchEngine.css';
import logo from '../Images/Horrify-logo.png'

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hits: [],
      selectedHit: null
    }
  }

  searchResult = (e) => {
    const query = {
      query: {
        match: {
          "title": e.target.value
        }
      }
    };

    axios.get('https://search.horrify.nl/es/_search', {
      params: {
        source: JSON.stringify(query),
        source_content_type: 'application/json'
      }
    }).then((res) => {
      this.setState({ hits: res.data.hits.hits })
    });
  }


  render() {
    const { hits, selectedHit } = this.state;

    return (
      <div className="container">
        <img className="logo" src={logo} alt="horrify-logo" />
        <SearchIcon>search_icon</SearchIcon>

        <TextField className="search-label"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon className="search-icon" />
                </IconButton>
              </InputAdornment>
            )
          }}

          label="Search Movie Title"
          variant="outlined"
          placeholder="Search..."
          onChange={this.searchResult}
        />

        <Grid className="GridContainer" container spacing={3} style={{ marginTop: 10 }}>
          {hits.map(hit =>
            <Grid item sm={3} >
              <Card onClick={() => this.setState({ selectedHit: hit._source })} >
                <CardActionArea >
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="h2">
                      {hit._source.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {hit._source.short_description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>


        <div>
          {selectedHit && (<Dialog aria-labelledby="dialog-title" open={selectedHit}>
            <DialogTitle id="dialog-title">
              {selectedHit.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                {selectedHit.description}
              </Typography>

            </DialogContent>
            <DialogActions>
              <Button autoFocus color="primary" onClick={() => this.setState({ selectedHit: null })}>
                Sluiten
          </Button>
            </DialogActions>
          </Dialog>)}
        </div>

      </div >

    )
  }
}

export default Search