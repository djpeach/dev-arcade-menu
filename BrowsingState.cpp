#include <sstream>
#include <iostream>
#include "BrowsingState.hpp"
#include "DEFINITIONS.hpp"

namespace peachgames {
  BrowsingState::BrowsingState(EngineRef engineRef) : engine(engineRef) {}

  void BrowsingState::init() {

  }

  void BrowsingState::handleInput() {
    sf::Event event;
    while(engine->window.pollEvent(event)) {
      switch(event.type) {
        case sf::Event::Closed:
          engine->window.close();
          break;
        case sf::Event::KeyPressed:
          switch (event.key.code) {
            case sf::Keyboard::Num1:
              engine->window.close();
              break;
            default:
              break;
          }
        default:
          break;
      }
    }
  }

  void BrowsingState::update(float dt) {

  }

  void BrowsingState::draw(float dt) {
    engine->window.clear();
    engine->window.display();
  }

}
