#pragma once

#include "State.hpp"
#include "Menu.hpp"
#include "GameDTO.hpp"

namespace peachgames {

  class BrowsingState : public State {
  public:
    BrowsingState(EngineRef engineRef);
    ~BrowsingState();

    void init();

    void handleInput();
    void update(float dt);
    void draw(float dt);

  private:
    EngineRef engine;
    GameDTO *games;
  };

}
