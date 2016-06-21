window.onPlayerStateChange = (event) ->
  # On Play
  if event.data == 1
    
    if !window.playing
        $("#main-navbar").fadeToggle()
        window.playing = true
    
    # Relative tu BUTTON CONSTRUCTOR -------------------------    
    # clearInterval(window.playerInterval)
      
    # BUTTON CONSTRUCTOR -------------------------------------
    #
    # t = Math.floor(player.getCurrentTime()) + 1
    # video_id = $("#player-div").data("id")
    # map_buttons = gon.map_buttons[video_id]
    # content_buttons = gon.content_buttons[video_id]
        
    # window.playerInterval = setInterval (->
    #   for map_btn in map_buttons
    #     if t >= map_btn.timestamp && t <= map_btn.fade
    #       if !document.getElementById("i" + map_btn.timestamp)
    #         insertMapBtn map_btn
    #     if t < map_btn.timestamp || t > map_btn.fade
    #       $("#i" + map_btn.timestamp).remove()
          
    #   for content_btn in content_buttons
    #     if t >= content_btn.timestamp && t <= content_btn.fade
    #       if !document.getElementById("i" + content_btn.timestamp)
    #         insertContentBtn content_btn
    #     if t < content_btn.timestamp || t > content_btn.fade
    #       $("#i" + content_btn.timestamp).remove()
    #    t += 0.5
    #   return), 500
  
  # On Pause
  if event.data == 2
    $("#main-navbar").fadeToggle()
    window.playing = false

    # Relative tu BUTTON CONSTRUCTOR -------------------------    
    # clearInterval(window.playerInterval)
  return