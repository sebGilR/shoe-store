# Shoe Store
## Solution Presentation

My main goal with this solution is to present not just something that works but also properly formatted and legible code, as well as a solution that could easily be extended 
to have more features.

I decided to use React to build the interface as it allows me to focus on code readability and gives me a faster development experience, which allowed me to add a couple of non-required features that make the interface more useful.

### Demo

[View Loom Video](https://www.loom.com/share/0d2adb17d39c4232853a4f8f16dbbb86)

### Features

As a user I can:
- See the inventory (store name, model, product count) for each store alphabetically ordered.
- View the stock level and be alerted with colors and text when the stock is low, too low, empty, or high.
- Get a view of the stores and products that are running out of stock.
- Get a view of the stores and products that have the inventory almost full.
- See the low and high stock views side by side for comparison.
- In both views see a stats bar at the top with a count of: stores with low and high stock, shoe models with low and high stock.

### Potential improvements

- The data currently used for the stats could be used to generate an inventory transfer suggestions system.
- Add sorting and filtering functionality for easier browsing and comparison. The data structure currently is only good for optimizing update speeds, but might require changes for sorting.
- The stats could be more accurate, currently the low stock stat shows stock across some stores, but the same shoes might be part of the high stock stats for other stores.
- Styling coud be improved to be better suited the site's purpose, and to fit more information easily.

### Bugs found

- Once a product is no longer low or high on stock, and if the store has no other high/low stock product to display, it remains in the stats count and in the table view. Only that it shows no product row since it actually doesn't have a low/high stock product. My assumption is that I'm missing something to properly remove the store from the data structure.
- Sometimes the bottom right cell of a store product's list is misaligned.


### Technologies used

- React
- React Router
- TypeScript
- ESLint + Prettier
- Styled Components

### How to run it
The server was moved to the server directory. From the root directory:

```
cd server/
websocketd --port=8080 ruby inventory.rb
```

The client is under the client directory. From the root directory:
```
cd client/
yarn install
yarn start
```

NOTE: When the client first starts (or if the page is reloaded, since there is no data persistency built-in) the page starts off empty and as data comes in it gets filled.
___

## Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed. The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

```
{
  'store' => 'ALDO Ste-Catherine',
  'model' => 'ADERI',
  'inventory' => 10,
}
```

`ALDO Ste-Catherine` store sold a pair of `ADERI` shoes. `ALDO Ste-Catherine` now has 10 pairs of `ADERI` left.

## Goal

**Design an interface that would allow the inventory department to monitor Aldo's stores and shoes inventory.**

Hope you’ll have fun with this little test. I know I had designing it.
Go wild. It can be anything you want. I’ve seen results printed to console, displayed on a webpage, and even someone who did periodical database dumps.

Here are a few ideas if you need an extra challenge:

- Add some sort of alerting system, e.g. When a shoe model at a store goes too low, or too high.
- Add a REST JSON API, or GraphQL
- Suggest shoe transfers from one store to another according to inventory
- Your own crazy idea!

Share your repository with us when you’re done.

Happy Hacking :)

## Installation

This projects uses the popular library `websocketd` to send messages.

If you're on a Mac, you can install `websocketd` using [Homebrew](http://brew.sh/). Just run `brew install websocketd`. For other operating systems, or if you don't want to use Homebrew, check out the link below.

**[Download for Linux, OS X and Windows](https://github.com/joewalnes/websocketd/wiki/Download-and-install)**

Note that a Ubuntu 64-bit version is already bundled here `bin/websocketd` for convenience.

## Getting Started

### Inventory Server

Your WebSocket Server is the tap that aggregates inventories from all stores.

You can run it directly from your own machine.

Run the following to start tapping into the inventory events.

```
(bin/)websocketd --port=8080 ruby inventory.rb
```

You now have an active connection to their stores opened on port 8080.

### Start listening on each event

Listen and react on each event using a WebSocket client.

Various implementations are at your disposal. Whatever floats your boat.

They all work the same way. Provide a method or a block to be executed whenever a new event occurs.

Here are two examples for our favorite languages:

#### Javascript

Open a console on a non-secured page:

```
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log(event.data);
};
```

#### Ruby

##### Installation

```
gem install faye-websocket
gem install eventmachine
```

##### Example

```
require 'faye/websocket'
require 'eventmachine'
require 'json'

EM.run {
  ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

  ws.on :message do |event|
    p JSON.parse(event.data)
  end
}
```
