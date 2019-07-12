#include "Menu.hpp"
#include "IntroState.hpp"

namespace peachgames {

  Menu::Menu() {
    engine->window.create(sf::VideoMode::getDesktopMode(), "", sf::Style::Fullscreen);
    engine->states.addState(StateRef(new IntroState(engine)));

    run();
  }

  void Menu::run() {
    float newTime, frameTime, interpoloation;

    float currentTime = clock.getElapsedTime().asSeconds();
    float accumulator = 0.0f;

    while (engine->window.isOpen()) {

      engine->states.processStateChanges();
      newTime = clock.getElapsedTime().asSeconds();
      frameTime = newTime - currentTime;
      if (frameTime > 0.25f) {
        frameTime = 0.25f;
      }

      currentTime = newTime;
      accumulator += frameTime;

      while (accumulator >= dt) {
        engine->states.getActiveState()->handleInput();
        engine->states.getActiveState()->update(dt);

        accumulator -= dt;
      }
      interpoloation = accumulator / dt;

      engine->states.getActiveState()->draw(dt);

    }
  }
}
