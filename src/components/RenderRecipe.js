import React, { Component, Fragment } from "react";

export class RenderRecipe extends Component {
  componentDidMount() {}
  render() {
    return (
      <Fragment>
        <div className="App">
          <div className="">
            <div id="title" className="my-4 text-4xl text-center">
              drink.recipe
            </div>
            <center>
              <hr className="w-5/6 md:w-2/3" />
            </center>
            <br />
            <div id="ingredients" className="grid grid-cols-2">
              <div className="col-span-2 md:col-span-1 text-xl text-center mb-6 md:mb-0">
                Ingredients
              </div>
              <div className="col-span-2 md:col-span-1 text-md text-center md:text-left">
                <div className="space-x-4">
                  <div className="inline font-semibold">measurement</div>
                  <div className="inline">ingredient.1</div>
                </div>
                <div className="space-x-4">
                  <div className="inline font-semibold">measurement</div>
                  <div className="inline">ingredient.2</div>
                </div>
                <div className="space-x-4">
                  <div className="inline font-semibold">measurement</div>
                  <div className="inline">ingredient.3</div>
                </div>
              </div>
            </div>
            <br />
            <center>
              <hr className="w-5/6 md:w-2/3" />
            </center>
            <br/>
            <div id="steps" className="">
              <div class="text-xl text-center mb-6 md:mb-0">Steps</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
