// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";

import "../contracts/OwnableFactory.sol";

contract PostsTest is Test {
  function testPosts() public {
    OwnableFactory factory = new OwnableFactory();
  }

}
