import React, { Component, Fragment } from "react";

export class Creator extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <center>
            <div id="" className="mx-8 md:mx-32">
              <div id="title" className="my-4 text-4xl text-center">
                Create New Recipe
              </div>
              <hr className="" />
              <br />
              <form>
                <div className="grid grid-cols-2 space-y-4 md:space-y-0">
                  <div className="col-span-2 md:col-span-1">Name</div>
                  <div className="col-span-2 md:col-span-1 md:text-left">
                    <input
                      onChange={function () {}}
                      className="border-black border-2 w-full"
                      type="text"
                    />
                  </div>
                </div>
                <br />
                <div className="grid grid-cols-2 space-y-4">
                  <div className="col-span-2">Ingredients</div>
                  <div className="col-span-2">
                    <input
                      onChange={function () {}}
                      className="border-black border-2 w-full"
                      type="text"
                    />
                  </div>
                </div>
                <br />
                <div className="text-center">
                  <button
                    onClick={function (e) {
                      e.preventDefault();
                    }}
                    className="rounded-full font-semibold px-8 py-2 bg-red-500 hover:bg-red-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </center>
        </div>
      </Fragment>
    );
  }
}
