#pragma once

#include <memory>

#include <SFML/Graphics.hpp>
#include "StateMachine.hpp"
#include "AssetManager.hpp"

namespace peachgames {

  struct Engine {
    StateMachine states;
    sf::RenderWindow window;
    AssetManager assets;
  };

  typedef std::shared_ptr<Engine> EngineRef;

  class Menu {
  public:
    Menu();
  private:
    const float dt = 1.0f / 60.0f;
    sf::Clock clock;

    EngineRef engine = std::make_shared<Engine>();

    void run();
  };

}
