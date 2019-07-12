#pragma once

#include <SFML/Graphics.hpp>
#include "State.hpp"
#include "Menu.hpp"

namespace peachgames {

  class IntroState : public State {
  public:
    IntroState(EngineRef engineRef);

    void init();

    void handleInput();
    void update(float dt);
    void draw(float dt);

  private:
    EngineRef engine;
    sf::Clock clock;
    sf::Sprite background;
  };

}
