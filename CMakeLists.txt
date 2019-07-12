cmake_minimum_required(VERSION 3.7)

project(dev-arcade-menu LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(SFML_DIR "~/lib/SFML")

find_package(SFML 2.5.1 COMPONENTS graphics audio REQUIRED)

#we add the executable of the program
add_executable(dev-arcade-menu
                main.cpp
                )

target_link_libraries(dev-arcade-menu sfml-graphics sfml-audio )
