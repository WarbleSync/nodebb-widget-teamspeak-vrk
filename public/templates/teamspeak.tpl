<link rel="stylesheet" type="text/css" href="/plugins/nodebb-widget-teamspeak-vrk/public/css/style.css">
<div class="ts3-vrk-widget">
  <h4 class="ts3-title" >
    {serverName}
    <span class="small">
      ({serverAddress})
    </span>
  </h4>

  <a class="btn btn-primary ts3-join-button" role="button" href="ts3server://{serverAddress}">
    <div class="text-uppercase">join server</div>
  </a>

  <div class="ts3-online-clients" >
    <div>
      <span class="badge">
        {clients.length}
      </span> Users Online:
    </div>

    <div class="ts3-online-users" >
      <ul class="list-group text-right">
        <!-- BEGIN clients -->
          <li class="list-group-item"> {clients.client_nickname} </li>
        <!-- END clients -->
      </ul>
    </div>
  </div>
</div>
