#pragma once

#include <memory>
#include <stack>

#include "State.hpp"

namespace peachgames {
  typedef std::unique_ptr<State> StateRef;

  class StateMachine {
  public:
    StateMachine() {};
    ~StateMachine() {};

    void addState(StateRef newState, bool isReplacing = true);
    void removeState();

    void processStateChanges();

    StateRef& getActiveState();

  private:
    std::stack<StateRef> states;
    StateRef newState;

    bool isRemoving;
    bool isAdding;
    bool isReplacing;
  };
}
