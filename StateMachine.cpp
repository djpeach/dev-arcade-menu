#include "StateMachine.hpp"

namespace peachgames {
  void StateMachine::addState(StateRef newState, bool isReplacing) {
    isAdding = true;
    this->isReplacing = isReplacing;
    this->newState = std::move(newState);
  }

  void StateMachine::removeState() {
    isRemoving = true;
  }

  void StateMachine::processStateChanges() {
    if (isRemoving && !states.empty()) {
      states.pop();

      if (!states.empty()) {
        states.top()->resume();
      }

      isRemoving = false;
    }

    if (isAdding) {
      if (!states.empty()) {
        if (isReplacing) {
          states.pop();
        } else {
          states.top()->pause();
        }
      }

      states.push(std::move(newState));
      states.top()->init();
      isAdding = false;
    }
  }

  StateRef& StateMachine::getActiveState() {
    return states.top();
  }
}
