#include <sstream>
#include <iostream>
#include "IntroState.hpp"
#include "BrowsingState.hpp"
#include "DEFINITIONS.hpp"

namespace peachgames {
  IntroState::IntroState(EngineRef engineRef) : engine(engineRef) {}

  void IntroState::init() {
    engine->assets.loadTexture("Intro Background", "assets/images/introBackground.png");

    background.setTexture(engine->assets.getTexture("Intro Background"));

    sf::Vector2f targetBackgroundSize = engine->window.getView().getSize();
    background.setScale(targetBackgroundSize.x / background.getLocalBounds().width, targetBackgroundSize.y / background.getLocalBounds().height);
  }

  void IntroState::handleInput() {
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

  void IntroState::update(float dt) {
    if (this->clock.getElapsedTime().asSeconds() > INTRO_SHOW_TIME) {
      engine->states.addState(StateRef(new BrowsingState(engine)));
    }

  }

  void IntroState::draw(float dt) {
    engine->window.clear();
    engine->window.draw(this->background);
    engine->window.display();
  }

}
